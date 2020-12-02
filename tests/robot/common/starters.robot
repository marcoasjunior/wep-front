*** Settings ***
Library  SeleniumLibrary
# from selenium.webdriver import Firefox

# *** Test Cases ***
# Start Open Browser
#     Initial test open Browser


*** Keywords ***
Initial test open Browser
    Open Browser    about:blank     ${BROWSER}      alias=Palmito
    Go to   ${BASE_URL}
    Maximize Browser Window