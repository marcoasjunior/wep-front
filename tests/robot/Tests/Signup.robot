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

    
    sleep   3s  
    Choose File     xpath=//*[@id="app_p"]/div/div/div[1]/input      C:/works-pedro/wep-front/tests/robot/resources/08.jpg
    
    Element Should be Visible   xpath=//*[@id="input-22"]
    Click Element   xpath=//*[@id="input-22"]
    Input Text  xpath=//*[@id="input-22"]   ${NEW_USER_NAME}

    Element Should be Visible   xpath=//*[@id="input-26"]
    Click Element   xpath=//*[@id="input-26"]
    Input Text  xpath=//*[@id="input-26"]   ${NEW_USER_EMAIL}

    Element Should be Visible   xpath=//*[@id="input-30"]
    Click Element   xpath=//*[@id="input-30"]
    Input Text  xpath=//*[@id="input-30"]   ${NEW_USER_PASSWORD}

    Element Should be Visible   xpath=//*[@id="input-35"]
    Click Element   xpath=//*[@id="input-35"]
    Input Text  xpath=//*[@id="input-35"]   ${NEW_USER_PASSWORD}

    Element Should be Visible   xpath=//*[@id="input-40"]
    Click Element   xpath=//*[@id="input-40"]
    Input Text  xpath=//*[@id="input-40"]   ${NEW_USER_PHONE}

    Element Should be Visible   xpath=//*[@id="app_p"]/div/div/div[2]/form/div[6]/div/div[1]/div/div[1]
    Click Element   xpath=//*[@id="app_p"]/div/div/div[2]/form/div[6]/div/div[1]/div/div[1]

    Wait Until Element Is Enabled   xpath=//*[@id="app_p"]/div/div/div[2]/form/div[7]/div/button
    Click Element   xpath=//*[@id="app_p"]/div/div/div[2]/form/div[7]/div/button

    Run Keyword     Signup okay?

Signup okay?
    Wait Until Element Is visible   xpath=//*[@id="app_p"]/div/div/div/div/div[1]/p
    Element Should Contain  xpath=//*[@id="app_p"]/div/div/div/div/div[1]/p     Wep seu evento!

    Wait Until Element Is visible   xpath=//*[@id="app_p"]/div/div/div/div/div[2]/a
    Click Element   xpath=//*[@id="app_p"]/div/div/div/div/div[2]/a
    
    Wait Until Element Is visible   xpath=//*[@id="app_p"]/div/div[1]
    Element Should be Visible   xpath=//*[@id="app_p"]/div/div[1]