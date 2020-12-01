*** Settings ***
Documentation  Signup test account
Library  SeleniumLibrary

Resource  ../common/variables.robot
Resource  ../common/starters.robot


*** Test Cases ***
Start Open Browser
    Initial test open Browser

try signup new account
    try signup user

*** Keywords ***
Initial test open Browser
    starters.Initial test open Browser

try signup user
    Wait Until Element Is visible   xpath=//*[@id="app_p"]/div/div/div/a[1]
    Click Element   xpath=//*[@id="app_p"]/div/div/div/a[2]

    
    Choose File     xpath=//*[@id="app_p"]/div/div/div[1]/input      D:/works-pedro/wep-front/tests/robot/resources/08.jpg
    
    Element Should be Visible   xpath=//*[@id="input-22"]
    Click Element   xpath=//*[@id="input-22"]
    Input Text  xpath=//*[@id="input-22"]   ${NEW_USER_NAME}

    Element Should be Visible   xpath=//*[@id="input-26"]
    Click Element   xpath=//*[@id="input-26"]
    Input Text  xpath=//*[@id="input-26"]   ${NEW_USER_EMAIL}

    Element Should be Visible   xpath=//*[@id="input-30"]
    Click Element   xpath=//*[@id="input-30"]
    Input Text  xpath=//*[@id="input-30"]   ${NEW_USER_PASSWORD}

    Element Should be Visible   xpath=//*[@id="input-34"]
    Click Element   xpath=//*[@id="input-34"]
    Input Text  xpath=//*[@id="input-34"]   ${NEW_USER_PASSWORD}

    Element Should be Visible   xpath=//*[@id="input-38"]
    Click Element   xpath=//*[@id="input-38"]
    Input Text  xpath=//*[@id="input-38"]   ${NEW_USER_PHONE}

    Element Should be Visible   xpath=//*[@id="app_p"]/div/div/div[2]/form/div[6]/div/div[1]/div/div[1]
    Click Element   xpath=//*[@id="app_p"]/div/div/div[2]/form/div[6]/div/div[1]/div/div[1]

    Wait Until Element Is Enabled   xpath=//*[@id="app_p"]/div/div/div[2]/form/div[7]/button
    Click Element   xpath=//*[@id="app_p"]/div/div/div[2]/form/div[7]/button

    # Run Keyword     Signup okay?

Signup okay?
    Wait Until Element Is visible   xpath=//*[@id="app_p"]/div/div

    