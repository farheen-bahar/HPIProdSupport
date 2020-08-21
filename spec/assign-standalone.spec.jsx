const fs = require('fs');
const { element, browser } = require('protractor');
const { dashboard, incidents, updateFields } = require('../properties');
const EC = protractor.ExpectedConditions;
var incr = 0;

const automateAssignment = async () => {
  // select 1st <iframe>
  await browser.switchTo().frame(dashboard.contentIFrameIndex)
    .then(async () => {
      // disable waiting angular execution
      browser.waitForAngularEnabled(false);
      // select all incident links in the page & iterate
      await $$(incidents.linkSelector).each(async (elem, index) => {
        try {
          // filtering only 1 link at once
          if (index < 1) {
            await browser.sleep(1000);
            // wait for 5 secs for the link to be clickable, otherwise it will stop execution here
            await browser.wait(EC.elementToBeClickable($$(incidents.linkSelector).get(incr)), 5000);
            // select the link by using the index from the incr variable & move mouse over it
            await browser.actions().mouseMove($$(incidents.linkSelector).get(incr)).perform()
              .then(async () => await browser.actions().keyDown(protractor.Key.CONTROL).perform()) // Press Control key of keyboard
              .then(async () => await browser.actions().click().perform()) // Click on the link
              .then(async () => await browser.actions().keyUp(protractor.Key.CONTROL).perform()) // Release Control key of keyboard
              .then(async () => {
                await browser.sleep(1000);
                // Move the browser control out from iframe to the parent page
                await browser.switchTo().defaultContent();
                // Handles the Windows & Tabs opened under Protractor Testing
                await browser.getWindowHandle()
                  .then(async (parentGUID) => {
                    // get the all the session ids of the opened tabs
                    await browser.getAllWindowHandles()
                      .then(async (allGUID) => {
                        // console.log('Number of tabs opened: ', allGUID.length);
                        // iterate through the tabs
                        browser.waitForAngularEnabled(false);
                        await allGUID.forEach(async (guid, index) => {
                          //find the new browser tab
                          if (guid != parentGUID) {
                            // switch to the tab
                            await browser.switchTo().window(guid);
                            await browser.sleep(incidents.loadingTime);
                            await browser.takeScreenshot().then((screenShot) => {
                              fs.writeFile('./Last-Incident-Start.png', screenShot, 'base64', (err) => err && console.log);
                            });
                            // perform here any actions needed on the new tab

                            /* await fields.forEach((field) => {
                              console.log(1, field);
                              await browser.executeScript(() => {
                                console.log(2, field);
                                if (field.onlyIfEmpty ? !document.getElementById(field.id).value : true) {
                                  console.log(3, field);
                                  // document.getElementById(field.id).value = 'Farheen Bahar';
                                  element(by.id(field.id)).sendKeys(field.value);
                                }
                              });
                              console.log(4, field);
                              await browser.sleep(field.waitTime);
                            }); */

                            // Impacted User Selection
                            await browser.executeScript(() => {
                              if (!document.getElementById('sys_display.incident.u_impacted_user').value) {
                                // document.getElementById('sys_display.incident.u_impacted_user').value = 'Farheen Bahar';
                                element(by.id('sys_display.incident.u_impacted_user')).sendKeys('Farheen Bahar');
                              }
                            });
                            await browser.sleep(1000);

                            // Category Selection
                            await browser.executeScript(() => {
                              const elem = document.getElementById('incident.category');
                              elem.value = 'inquiry';
                              elem.onchange();
                            });
                            await browser.sleep(3000);

                            // Sub-Category Selection
                            await browser.executeScript(() => {
                              const elem = document.getElementById('incident.subcategory');
                              elem.value = 'Internal Application';
                              elem.onchange();
                            });
                            await browser.sleep(1000);

                            // Enter Value for Business Service field if empty
                            await browser.executeScript(() => {
                              if (!document.getElementById('sys_display.incident.business_service').value) {
                                // document.getElementById('sys_display.incident.business_service').value = 'WEB CUSTOMER CARE';
                                element(by.id('sys_display.incident.business_service')).sendKeys('WEB CUSTOMER CARE');
                              }
                            });
                            await browser.sleep(1000);

                            // Enter Value for Configuration Item field if empty
                            await browser.executeScript(() => {
                              if (!document.getElementById('sys_display.incident.cmdb_ci').value) {
                                // document.getElementById('sys_display.incident.cmdb_ci').value = 'hpit:webcustcare';
                                element(by.id('sys_display.incident.cmdb_ci')).sendKeys('hpit:webcustcare');
                              }
                            });
                            await browser.sleep(1000);

                            // Contact Type Selection
                            await browser.executeScript(() => {
                              document.getElementById('incident.contact_type').value = 'email';
                            });
                            await browser.sleep(1000);

                            // Enter Value for Assignment Group field if empty
                            await browser.executeScript(() => {
                              if (!document.getElementById('sys_display.incident.assignment_group').value) {
                                // document.getElementById('sys_display.incident.assignment_group').value = 'W-HPI-INCFLS-DCES-WCC-PORTAL';
                                element(by.id('sys_display.incident.assignment_group')).sendKeys('W-HPI-INCFLS-DCES-WCC-PORTAL');
                              }
                            });
                            await browser.sleep(1000);

                            // Enter Value for Assigned To field
                            await browser.executeScript(() => {
                              document.getElementById('sys_display.incident.assigned_to').value = 'Farheen Bahar';
                            });
                            await browser.sleep(1000);

                            await browser.takeScreenshot().then((screenShot) => {
                              fs.writeFile('./Last-Incident-Assigned.png', screenShot, 'base64', (err) => err && console.log);
                            });
                            // Check if the Save and Exit button isclickable or not, if not the execution will stop here
                            await browser.wait(EC.elementToBeClickable(element.all(by.cssContainingText(incidents.saveButton.selector, incidents.saveButton.text)).last()), 5000);
                            // Click on Save and Exit Button
                            // await element.all(by.cssContainingText(incidents.saveButton.selector, incidents.saveButton.text)).last().click();
                            // Check if it is redirected to the following url, if not the execution will stop here
                            await browser.wait(EC.urlContains(incidents.verifyURL), incidents.saveButton.waitTime);
                            await browser.sleep(incidents.saveButton.waitTime);
                            // close the new tab
                            await browser.close();
                            // switch back to the parent tab
                            await browser.switchTo().window(parentGUID);
                            await browser.sleep(1000);
                            // refresh the parent tab
                            // await browser.refresh();
                            // Incrementing the incr variable & checking if it is less than the incident link counts
                            if (incr++ < allGUID.length) {
                              // Calling this whole process method again till the condition fails
                              await automateAssignment();
                            }
                          }
                        });
                      })
                  });
              })
          }
        } catch (error) {
          console.log(error);
        }
      })
    })
}

describe('Servicenow Automation', () => {
  it('Incidents Page', async () => {
    browser.waitForAngularEnabled(false);
    // Opening URL in the Browser
    await browser.driver.get(dashboard.url);

    // Timeout to wait for the URL to be opened in the browser
    await setTimeout(async () => {
      browser.ignoreSynchronization = true;
      // Calling the process method where all tasks are assigned
      await automateAssignment();
    }, dashboard.loadingTime);

    // Minimum time for the process to be executed
    await browser.sleep(dashboard.minExecutionTime);
  });
});