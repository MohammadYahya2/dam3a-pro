# main/forms.py

from django import forms
from .models import Contact, ServiceRequest
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Submit
from crispy_forms.layout import Submit, Layout, Row, Column
class ContactForm(forms.ModelForm):
    class Meta:
        model = Contact
        fields = ['name', 'email', 'subject', 'message']
        widgets = {
            'name': forms.TextInput(attrs={
                'placeholder': 'Your Name',
                'class': 'form-control'
            }),
            'email': forms.EmailInput(attrs={
                'placeholder': 'Your Email',
                'class': 'form-control'
            }),
            'subject': forms.TextInput(attrs={
                'placeholder': 'Subject',
                'class': 'form-control'
            }),
            'message': forms.Textarea(attrs={
                'placeholder': 'Your Message',
                'class': 'form-control',
                'rows': 5
            }),
        }

    def __init__(self, *args, **kwargs):
        super(ContactForm, self).__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_method = 'post'
        self.helper.layout = Layout(
            Row(
                Column('name', css_class='mb-3'),
                Column('email', css_class='mb-3'),
            ),
            Row(
                Column('subject', css_class='mb-3'),
            ),
            Row(
                Column('message', css_class='mb-3'),
            ),
            Submit('submit', 'Send Message', css_class='btn btn-primary mt-3')
        )

class ServiceRequestForm(forms.ModelForm):
    class Meta:
        model = ServiceRequest
        fields = ['service', 'name', 'email', 'phone', 'subject', 'message']
        widgets = {
            'service': forms.Select(attrs={'class': 'form-control'}),
            'name': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'اسمك'}),
            'email': forms.EmailInput(attrs={'class': 'form-control', 'placeholder': 'بريدك الإلكتروني'}),
            'phone': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'رقم هاتفك (اختياري)'}),
            'subject': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'الموضوع'}),
            'message': forms.Textarea(attrs={'class': 'form-control', 'placeholder': 'تفاصيل طلبك'}),
        }

    def __init__(self, *args, **kwargs):
        super(ServiceRequestForm, self).__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_method = 'post'
        self.helper.add_input(Submit('submit', 'إرسال الطلب', css_class='btn btn-primary'))
