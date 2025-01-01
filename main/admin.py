# main/admin.py

from django.contrib import admin
from django.utils.html import format_html
from .models import (
    Service,
    Project,
    TeamMember,
    Contact,
    ServiceRequest,
    Portfolio,
    InteriorDesignProject,
    InteriorDesignImage
)

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('title_en', 'title_ar', 'icon', 'image_tag')
    readonly_fields = ('image_tag',)

    def image_tag(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="50" height="50" />', obj.image.url)
        return "-"
    image_tag.short_description = 'صورة الخدمة'

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title_en', 'title_ar', 'link', 'image_tag')
    list_filter = ('created_at',)  # تأكد من أن 'created_at' موجود في نموذج Project
    search_fields = ('title_en', 'title_ar', 'description_en', 'description_ar')
    readonly_fields = ('image_tag',)

    def image_tag(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="50" height="50" />', obj.image.url)
        return "-"
    image_tag.short_description = 'صورة المشروع'

@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = (
        'name_en',
        'name_ar',
        'bio_en',
        'bio_ar',
        'github_link',
        'linkedin_link',
        'instagram_link',
        'youtube_link',
        'image_preview',
        'education_en', 
        'short_desc_en'
    )
    list_filter = ()  # أضف فلاتر إذا كانت ضرورية
    search_fields = ('name_en', 'name_ar', 'bio_en', 'bio_ar')
    readonly_fields = ('image_preview',)
    
    fields = (
        'name_en',
        'name_ar',
        'bio_en',
        'bio_ar',
        'education_en',       # إضافة هذا الحقل
        'short_desc_en',      # إضافة هذا الحقل
        'image',
        'github',
        'linkedin',
        'instagram',
        'youtube',
        'image_preview'
    )
    
    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="50" height="50" />', obj.image.url)
        return "-"
    image_preview.short_description = 'صورة العضو'
    
    def github_link(self, obj):
        if obj.github:
            return format_html('<a href="{}" target="_blank"><i class="fa fa-github"></i></a>', obj.github)
        return "-"
    github_link.short_description = 'GitHub'
    
    def linkedin_link(self, obj):
        if obj.linkedin:
            return format_html('<a href="{}" target="_blank"><i class="fa fa-linkedin"></i></a>', obj.linkedin)
        return "-"
    linkedin_link.short_description = 'LinkedIn'
    
    def instagram_link(self, obj):
        if obj.instagram:
            return format_html('<a href="{}" target="_blank"><i class="fa fa-instagram"></i></a>', obj.instagram)
        return "-"
    instagram_link.short_description = 'Instagram'
    
    def youtube_link(self, obj):
        if obj.youtube:
            return format_html('<a href="{}" target="_blank"><i class="fa fa-youtube"></i></a>', obj.youtube)
        return "-"
    youtube_link.short_description = 'YouTube'
    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="50" height="50" />', obj.image.url)
        return "-"
    image_preview.short_description = 'صورة العضو'

    def github_link(self, obj):
        if obj.github:
            return format_html('<a href="{}" target="_blank"><i class="fa fa-github"></i></a>', obj.github)
        return "-"
    github_link.short_description = 'GitHub'

    def linkedin_link(self, obj):
        if obj.linkedin:
            return format_html('<a href="{}" target="_blank"><i class="fa fa-linkedin"></i></a>', obj.linkedin)
        return "-"
    linkedin_link.short_description = 'LinkedIn'

    def instagram_link(self, obj):
        if obj.instagram:
            return format_html('<a href="{}" target="_blank"><i class="fa fa-instagram"></i></a>', obj.instagram)
        return "-"
    instagram_link.short_description = 'Instagram'

    def youtube_link(self, obj):
        if obj.youtube:
            return format_html('<a href="{}" target="_blank"><i class="fa fa-youtube"></i></a>', obj.youtube)
        return "-"
    youtube_link.short_description = 'YouTube'

@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'subject', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('name', 'email', 'subject', 'message')
    ordering = ('-created_at',)

@admin.register(ServiceRequest)
class ServiceRequestAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'service', 'subject', 'created_at')
    list_filter = ('service', 'created_at')
    search_fields = ('name', 'email', 'subject', 'message')

@admin.register(Portfolio)
class PortfolioAdmin(admin.ModelAdmin):
    list_display = ('title_en', 'category', 'created_at')
    list_filter = ('category',)
    search_fields = ('title_en', 'title_ar', 'description_en', 'description_ar')

    def image_tag(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="50" height="50" />', obj.image.url)
        return "-"
    image_tag.short_description = 'Project Image'

class InteriorDesignImageInline(admin.TabularInline):
    model = InteriorDesignImage
    extra = 1
    readonly_fields = ('image_preview',)
    fields = ('image', 'alt_en', 'alt_ar', 'order', 'image_preview')

    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="100" height="100" />', obj.image.url)
        return "-"
    image_preview.short_description = 'معاينة الصورة'

@admin.register(InteriorDesignProject)
class InteriorDesignProjectAdmin(admin.ModelAdmin):
    list_display = ('title_en', 'title_ar', 'designer', 'category', 'created_at')
    search_fields = ('title_en', 'title_ar', 'designer__name_en', 'designer__name_ar')
    list_filter = ('category', 'designer')
    inlines = [InteriorDesignImageInline]
