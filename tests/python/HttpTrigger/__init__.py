import logging

import azure.functions as func
import pyodbc


def main(req: func.HttpRequest) -> func.HttpResponse:
    return func.HttpResponse(
        "MYSTRY",
        status_code=200
    )
