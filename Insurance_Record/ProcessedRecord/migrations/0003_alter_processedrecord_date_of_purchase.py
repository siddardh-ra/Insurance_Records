# Generated by Django 3.2.9 on 2021-11-24 11:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ProcessedRecord', '0002_auto_20211124_0814'),
    ]

    operations = [
        migrations.AlterField(
            model_name='processedrecord',
            name='Date_of_Purchase',
            field=models.DateField(null=True),
        ),
    ]
