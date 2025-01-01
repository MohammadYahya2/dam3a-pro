from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('service-request/', views.service_request_view, name='service_request'),
    path('success/', views.success, name='success'),
    path('admin-dashboard/', views.AdminDashboardView.as_view(), name='admin_dashboard'),
    path('service-request/delete/<int:pk>/', views.ServiceRequestDeleteView.as_view(), name='service_request_delete'),
    path('contact/delete/<int:pk>/', views.ContactDeleteView.as_view(), name='contact_delete'),
    path('interior-design/', views.interior_design_view, name='interior_design'),
    path('team-member/<int:pk>/', views.TeamMemberDetailView.as_view(), name='team_member_detail'),  # مسار جديد
]
