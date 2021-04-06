import logging

import azure.functions as func
import pyodbc


def main(req: func.HttpRequest) -> func.HttpResponse:
    return func.HttpResponse(
        "4444",
        status_code=200
    )
