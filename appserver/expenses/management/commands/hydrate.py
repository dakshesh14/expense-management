import random

from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand

from expenses.models import Expenses


User = get_user_model()

DUMMY_EXPENSES = [
    {
        "name": "Grocery shopping",
        "description": "Bought food and household items at the supermarket",
        "date_of_expense": "2022-02-14",
        "category": "other",
        "amount": 59.99,
    },
    {
        "name": "Electric bill",
        "description": "Paid the electricity bill for the month",
        "date_of_expense": "2022-02-08",
        "category": "utilities",
        "amount": 125.00,
    },
    {
        "name": "Movie tickets",
        "description": "Went to the cinema to watch a new movie",
        "date_of_expense": "2022-02-22",
        "category": "entertainment",
        "amount": 28.50,
    },
    {
        "name": "Laptop purchase",
        "description": "Bought a new laptop for work",
        "date_of_expense": "2022-03-10",
        "category": "electronics",
        "amount": 1200.00,
    },
    {
        "name": "Gym membership",
        "description": "Signed up for a gym membership",
        "date_of_expense": "2022-03-01",
        "category": "health",
        "amount": 50.00,
    },
]


class Command(BaseCommand):
    help = "Hydrate the database with some data"

    def handle(self, *args, **options):
        admin, created = User.objects.get_or_create(username="admin")
        if created:
            admin.set_password("123")
            admin.is_active = True
            admin.save()

        normal_user, created = User.objects.get_or_create(username="user")
        if created:
            normal_user.set_password("123")
            normal_user.save()

        Expenses.objects.bulk_create(
            [
                Expenses(
                    name=expense["name"],
                    description=expense["description"],
                    date_of_expense=expense["date_of_expense"],
                    category=expense["category"],
                    amount=expense["amount"],
                    created_by=random.choice([admin, normal_user]),
                )
                for expense in DUMMY_EXPENSES
            ]
        )
