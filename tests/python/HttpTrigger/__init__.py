import logging

import azure.functions as func


def main(req: func.HttpRequest) -> func.HttpResponse:
    return func.HttpResponse(
        "UYIDFOIURTPUIPOASEIRUTPTA78FD9142JIOY7SFA",
        status_code=200
    )
