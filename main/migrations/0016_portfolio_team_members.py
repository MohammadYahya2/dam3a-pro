# Generated by Django 4.2.7 on 2024-12-30 15:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0015_teammember_education_en_teammember_short_desc_en_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='portfolio',
            name='team_members',
            field=models.ManyToManyField(blank=True, related_name='portfolios', to='main.teammember'),
        ),
    ]
