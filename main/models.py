# main/models.py

from django.db import models

class TeamMember(models.Model):
    name_en = models.CharField(max_length=100)
    name_ar = models.CharField(max_length=100)
    image = models.ImageField(upload_to='team/')
    education_en = models.CharField(max_length=255, blank=True, null=True)
    short_desc_en = models.TextField(blank=True, null=True)
    bio_en = models.TextField(blank=True, null=True)
    bio_ar = models.TextField(blank=True, null=True)
    github = models.URLField(blank=True, null=True)
    linkedin = models.URLField(blank=True, null=True)
    instagram = models.URLField(blank=True, null=True)
    youtube = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.name_en


class InteriorDesignProject(models.Model):
    CATEGORY_CHOICES = [
        ('residential', 'Residential'),
        ('commercial', 'Commercial'),
        ('industrial', 'Industrial'),
        ('hospitality', 'Hospitality'),
        # يمكنك إضافة المزيد حسب الحاجة
    ]

    title_en = models.CharField(max_length=200, verbose_name="Title (English)")
    title_ar = models.CharField(max_length=200, verbose_name="Title (Arabic)")
    description_en = models.TextField(verbose_name="Description (English)")
    description_ar = models.TextField(verbose_name="Description (Arabic)")
    designer = models.ForeignKey(TeamMember, on_delete=models.SET_NULL, null=True, related_name='interior_projects', verbose_name="Designer")
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, verbose_name="Category")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Interior Design Project"
        verbose_name_plural = "Interior Design Projects"

    def __str__(self):
        return self.title_en if self.title_en else self.title_ar

    def get_title(self, language_code):
        if language_code == 'en':
            return self.title_en or self.title_ar
        else:
            return self.title_ar or self.title_en

    def get_description(self, language_code):
        if language_code == 'en':
            return self.description_en or self.description_ar
        else:
            return self.description_ar or self.description_en

class InteriorDesignImage(models.Model):
    project = models.ForeignKey(InteriorDesignProject, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='interior_design/')
    alt_en = models.CharField(max_length=200, blank=True, verbose_name="Alt Text (English)")
    alt_ar = models.CharField(max_length=200, blank=True, verbose_name="Alt Text (Arabic)")
    order = models.PositiveIntegerField(default=0, verbose_name="Order")

    class Meta:
        verbose_name = "Interior Design Image"
        verbose_name_plural = "Interior Design Images"
        ordering = ['order']

    def __str__(self):
        return f"Image for {self.project.title_en or self.project.title_ar}"

class Service(models.Model):
    title_en = models.CharField(max_length=200)
    title_ar = models.CharField(max_length=200)
    description_en = models.TextField()
    description_ar = models.TextField()
    icon = models.CharField(max_length=50)  # لأيقونات Font Awesome
    image = models.ImageField(upload_to='services/', blank=True, null=True)  # حقل الصورة

    def __str__(self):
        return self.title_en

class Project(models.Model):
    title_en = models.CharField(max_length=200)
    title_ar = models.CharField(max_length=200)
    description_en = models.TextField()
    description_ar = models.TextField()
    image = models.ImageField(upload_to='projects/')
    link = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)  # إضافة هذا الحقل

    def __str__(self):
        return self.title_en

class Contact(models.Model):
    name = models.CharField(max_length=100, verbose_name="Name")
    email = models.EmailField(verbose_name="Email")
    subject = models.CharField(max_length=150, verbose_name="Subject")
    message = models.TextField(verbose_name="Message")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Created At")

    def __str__(self):
        return f"{self.name} - {self.subject}"

class ServiceRequest(models.Model):
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True, null=True)
    subject = models.CharField(max_length=200)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.service.title_en}"

class Portfolio(models.Model):
    CATEGORY_CHOICES = [
        ('web', 'Web Development'),
        ('design', 'Design'),
        ('seo', 'SEO'),
    ]

    title_en = models.CharField(max_length=200, verbose_name="Title (English)")
    title_ar = models.CharField(max_length=200, verbose_name="Title (Arabic)")
    description_en = models.TextField(verbose_name="Description (English)")
    description_ar = models.TextField(verbose_name="Description (Arabic)")
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, verbose_name="Category")
    image = models.ImageField(upload_to='portfolio/', verbose_name="Project Image")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Created At")
    team_members = models.ManyToManyField(TeamMember, related_name='portfolios', blank=True)  # إضافة هذا الحقل

    def __str__(self):
        return self.title_en

    class Meta:
        verbose_name = "Portfolio"
        verbose_name_plural = "Portfolios"
