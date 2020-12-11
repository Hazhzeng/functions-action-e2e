import logging

import azure.functions as func


def main(req: func.HttpRequest) -> func.HttpResponse:
    return func.HttpResponse(
        "JSKDLA",
        status_code=200
    )
