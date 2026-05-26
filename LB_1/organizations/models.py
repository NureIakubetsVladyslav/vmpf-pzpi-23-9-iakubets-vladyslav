from django.db import models


class Organization(models.Model):
    name = models.CharField(max_length=150, verbose_name="Назва організації")
    description = models.TextField(verbose_name="Опис")
    volunteers_count = models.PositiveIntegerField(verbose_name="Кількість волонтерів")

    def __str__(self):
        return self.name


class Resource(models.Model):
    organization = models.ForeignKey(
        Organization,
        on_delete=models.CASCADE,
        related_name="resources",
        verbose_name="Організація"
    )
    name = models.CharField(max_length=150, verbose_name="Назва ресурсу")
    quantity = models.PositiveIntegerField(verbose_name="Кількість")

    def __str__(self):
        return self.name


class Project(models.Model):
    organization = models.ForeignKey(
        Organization,
        on_delete=models.CASCADE,
        related_name="projects",
        verbose_name="Організація"
    )
    name = models.CharField(max_length=150, verbose_name="Назва проєкту")
    description = models.TextField(verbose_name="Опис проєкту")

    def __str__(self):
        return self.name


class DonationCampaign(models.Model):
    organization = models.ForeignKey(
        Organization,
        on_delete=models.CASCADE,
        related_name="donation_campaigns",
        verbose_name="Організація"
    )
    title = models.CharField(max_length=150, verbose_name="Назва збору")
    description = models.TextField(verbose_name="Опис збору")
    goal_amount = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        verbose_name="Потрібна сума"
    )
    collected_amount = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0,
        verbose_name="Зібрана сума"
    )

    def __str__(self):
        return self.title