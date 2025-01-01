# main/views.py

from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from .forms import ContactForm, ServiceRequestForm
from .models import Service, Project, TeamMember, Contact, ServiceRequest, InteriorDesignProject, Portfolio
from django.views.generic import ListView, DeleteView, DetailView  # إضافة DetailView
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
from django.urls import reverse_lazy
from django.core.exceptions import PermissionDenied
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags
import logging
from django.utils.translation import gettext as _  # استيراد دالة الترجمة
from django.utils.translation import get_language  # إضافة استيراد get_language

# إنشاء لوجر لتسجيل الأخطاء
logger = logging.getLogger(__name__)

def index(request):
    services = Service.objects.all()
    portfolios = Portfolio.objects.all().order_by('-created_at')  # جلب المشاريع في Portfolio
    projects = Project.objects.all().order_by('-created_at')  # جلب المشاريع في Project
    team_members = TeamMember.objects.all()
    interior_projects = InteriorDesignProject.objects.prefetch_related('images').all()  # جلب مشاريع التصميم الداخلي

    # التعامل مع نموذج الاتصال
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            contact = form.save()
            messages.success(request, _('شكراً على تواصلك معنا! سنعود إليك قريبًا.'))
            return redirect('index')
        else:
            logger.error(f"ContactForm errors: {form.errors}")
            messages.error(request, _('هناك أخطاء في النموذج. يرجى تصحيحها والمحاولة مرة أخرى.'))
    else:
        form = ContactForm()

    context = {
        'services': services,
        'portfolios': portfolios,
        'projects': projects,
        'team_members': team_members,
        'interior_projects': interior_projects,
        'form': form,
    }

    return render(request, 'index.html', context)

def service_request_view(request):
    selected_service_id = request.GET.get('service')
    selected_service = None
    if selected_service_id:
        try:
            selected_service = Service.objects.get(id=selected_service_id)
        except Service.DoesNotExist:
            selected_service = None

    if request.method == 'POST':
        form = ServiceRequestForm(request.POST)
        if form.is_valid():
            service_request = form.save()
            messages.success(request, _('تم إرسال طلبك بنجاح! سنقوم بالرد عليك قريبًا.'))

            # إعداد محتوى البريد الإلكتروني باستخدام القالب (اختياري)
            subject = f"طلب خدمة جديد: {service_request.service.title_en}"
            html_message = render_to_string('service_request_email.html', {
                'service': service_request.service.title_en,
                'name': service_request.name,
                'email': service_request.email,
                'phone': service_request.phone if service_request.phone else _('غير متوفر'),
                'subject': service_request.subject,
                'message': service_request.message,
            })
            plain_message = strip_tags(html_message)
            recipient_list = ['dam3abro@gmail.com']  # بريدك الإلكتروني

            try:
                send_mail(
                    subject,
                    plain_message,
                    'your_email@example.com',  # تأكد من تغيير هذا إلى بريدك الإلكتروني الفعلي
                    recipient_list,
                    fail_silently=False,
                    html_message=html_message,
                )
            except Exception as e:
                # تسجيل الخطأ وإظهار رسالة خطأ للمستخدم
               
                logger.error(f"Error sending service request email: {e}")

            return redirect('service_request')
        else:
            messages.error(request, _('حدث خطأ ما. يرجى المحاولة مرة أخرى.'))
    else:
        initial_data = {}
        if selected_service:
            initial_data['service'] = selected_service.id  # تعيين معرف الخدمة
        form = ServiceRequestForm(initial=initial_data)

    return render(request, 'service_request.html', {
        'form': form,
        'selected_service': selected_service
    })

def success(request):
    """
    دالة لعرض صفحة النجاح بعد تقديم النموذج بنجاح.
    """
    return render(request, 'success.html')

class AdminDashboardView(LoginRequiredMixin, UserPassesTestMixin, ListView):
    model = ServiceRequest
    template_name = 'admin_dashboard.html'
    context_object_name = 'service_requests'
    paginate_by = 10  # عدد الطلبات المعروضة في كل صفحة

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        # إضافة رسائل الاتصال إلى السياق
        context['contacts'] = Contact.objects.all().order_by('-created_at')
        return context

    def test_func(self):
        return self.request.user.is_staff  # يسمح فقط للمستخدمين الذين هم موظفون (Staff)

    def handle_no_permission(self):
        if not self.request.user.is_authenticated:
            return super().handle_no_permission()  # إعادة التوجيه إلى صفحة تسجيل الدخول
        else:
            raise PermissionDenied  # رفع خطأ 403 Forbidden للمستخدمين غير الموظفين

class ServiceRequestDeleteView(LoginRequiredMixin, UserPassesTestMixin, DeleteView):
    model = ServiceRequest
    template_name = 'service_request_confirm_delete.html'
    success_url = reverse_lazy('admin_dashboard')

    def test_func(self):
        return self.request.user.is_staff

    def handle_no_permission(self):
        if not self.request.user.is_authenticated:
            return super().handle_no_permission()
        else:
            raise PermissionDenied

    def delete(self, request, *args, **kwargs):
        messages.success(request, _('تم حذف طلب الخدمة بنجاح.'))
        return super().delete(request, *args, **kwargs)

class ContactDeleteView(LoginRequiredMixin, UserPassesTestMixin, DeleteView):
    model = Contact
    template_name = 'contact_confirm_delete.html'
    success_url = reverse_lazy('admin_dashboard')

    def test_func(self):
        return self.request.user.is_staff

    def handle_no_permission(self):
        if not self.request.user.is_authenticated:
            return super().handle_no_permission()
        else:
            raise PermissionDenied

    def delete(self, request, *args, **kwargs):
        messages.success(request, _('تم حذف رسالة الاتصال بنجاح.'))
        return super().delete(request, *args, **kwargs)

def interior_design_view(request):
    interior_projects = InteriorDesignProject.objects.prefetch_related('images').all()
    current_language = get_language()
    context = {
        'interior_projects': interior_projects,
        'language_code': current_language,
    }
    return render(request, 'interior_design.html', context)
class TeamMemberDetailView(DetailView):
    model = TeamMember
    template_name = 'team_member_detail.html'  # اسم القالب الجديد
    context_object_name = 'member'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        # جلب محفظة العضو (Portfolio)
        context['portfolio'] = self.object.portfolios.all()  # تأكد من علاقة ManyToManyField في النموذج
        return context