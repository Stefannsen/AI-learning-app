import uvicorn


if __name__ == "__main__":
    uvicorn.run("app_package.api:app", host="0.0.0.0", port=8000, reload=True)
