from django.shortcuts import render, get_object_or_404, redirect
from .models import Organization, DonationCampaign
from .forms import DonationCampaignForm


def organization_list(request):
    organizations = Organization.objects.all()

    return render(
        request,
        'organizations/organization_list.html',
        {'organizations': organizations}
    )


def organization_detail(request, organization_id):
    organization = get_object_or_404(
        Organization,
        id=organization_id
    )

    return render(
        request,
        'organizations/organization_detail.html',
        {'organization': organization}
    )


def donation_create(request, organization_id):
    organization = get_object_or_404(
        Organization,
        id=organization_id
    )

    if request.method == 'POST':
        form = DonationCampaignForm(request.POST)

        if form.is_valid():
            donation = form.save(commit=False)
            donation.organization = organization
            donation.save()

            return redirect(
                'organization_detail',
                organization_id=organization.id
            )
    else:
        form = DonationCampaignForm()

    return render(
        request,
        'organizations/donation_form.html',
        {
            'form': form,
            'organization': organization,
            'title': 'Створення збору пожертв'
        }
    )


def donation_edit(request, donation_id):
    donation = get_object_or_404(
        DonationCampaign,
        id=donation_id
    )

    if request.method == 'POST':
        form = DonationCampaignForm(
            request.POST,
            instance=donation
        )

        if form.is_valid():
            form.save()

            return redirect(
                'organization_detail',
                organization_id=donation.organization.id
            )
    else:
        form = DonationCampaignForm(instance=donation)

    return render(
        request,
        'organizations/donation_form.html',
        {
            'form': form,
            'organization': donation.organization,
            'title': 'Редагування збору пожертв'
        }
    )


def donation_delete(request, donation_id):
    donation = get_object_or_404(
        DonationCampaign,
        id=donation_id
    )

    organization_id = donation.organization.id

    if request.method == 'POST':
        donation.delete()

        return redirect(
            'organization_detail',
            organization_id=organization_id
        )

    return render(
        request,
        'organizations/donation_confirm_delete.html',
        {'donation': donation}
    )