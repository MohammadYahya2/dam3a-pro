# Generated by Django 4.2.7 on 2024-12-29 16:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0013_remove_teammember_bio_ar_remove_teammember_bio_en_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='teammember',
            old_name='social_facebook',
            new_name='github',
        ),
        migrations.RenameField(
            model_name='teammember',
            old_name='social_instagram',
            new_name='instagram',
        ),
        migrations.RenameField(
            model_name='teammember',
            old_name='social_linkedin',
            new_name='linkedin',
        ),
        migrations.RenameField(
            model_name='teammember',
            old_name='social_twitter',
            new_name='youtube',
        ),
        migrations.RemoveField(
            model_name='teammember',
            name='description_ar',
        ),
        migrations.RemoveField(
            model_name='teammember',
            name='description_en',
        ),
        migrations.RemoveField(
            model_name='teammember',
            name='education_ar',
        ),
        migrations.RemoveField(
            model_name='teammember',
            name='education_en',
        ),
        migrations.RemoveField(
            model_name='teammember',
            name='short_desc_ar',
        ),
        migrations.RemoveField(
            model_name='teammember',
            name='short_desc_en',
        ),
        migrations.AddField(
            model_name='teammember',
            name='bio_ar',
            field=models.TextField(default='2'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='teammember',
            name='bio_en',
            field=models.TextField(default='2'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='teammember',
            name='image',
            field=models.ImageField(upload_to='team/'),
        ),
        migrations.AlterField(
            model_name='teammember',
            name='name_ar',
            field=models.CharField(max_length=200),
        ),
        migrations.AlterField(
            model_name='teammember',
            name='name_en',
            field=models.CharField(max_length=200),
        ),
    ]
