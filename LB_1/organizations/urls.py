from django.urls import path
from . import views


urlpatterns = [
    path('', views.organization_list, name='organization_list'),

    path(
        'organization/<int:organization_id>/',
        views.organization_detail,
        name='organization_detail'
    ),

    path(
        'organization/<int:organization_id>/donation/create/',
        views.donation_create,
        name='donation_create'
    ),

    path(
        'donation/<int:donation_id>/edit/',
        views.donation_edit,
        name='donation_edit'
    ),

    path(
        'donation/<int:donation_id>/delete/',
        views.donation_delete,
        name='donation_delete'
    ),
]