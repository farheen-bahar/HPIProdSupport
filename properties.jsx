module.exports = {
  login: {
    domain: 'https://login.external.hp.com',
    loadingTime: 15000,
    usernameId: 'username',
    passwordId: 'password',
    submitButton: 'input[type="submit"]'
  },
  dashboard: {
    url: 'https://hpitprod.service-now.com/nav_to.do?uri=%2Fincident_list.do%3Fsysparm_query%3Dassignment_groupDYNAMICd6435e965f510100a9ad2572f2b47744%255Eassigned_toISEMPTY%255EstateNOT%2520IN6%252C7%26sysparm_first_row%3D1%26sysparm_view%3D',
    minExecutionTime: 60000,
    loadingTime: 15000,
    contentIFrameIndex: 'gsft_main'
  },
  incidents: {
    linkSelector: 'a.linked.formlink',
    loadingTime: 60000,
    saveButton: {
      selector: '#sysverb_update',
      text: 'Save and Exit',
      waitTime: 5000
    },
    verifyURL: 'https://hpitprod.service-now.com/incident_list.do'
  },
  updateFields: {
    impactedUser: {
      elemId: 'sys_display.incident.u_impacted_user',
      elemVal: 'Farheen Bahar',
      onlyIfEmpty: true,
      waitTime: 1000
    },
    category: {
      elemId: 'incident.category',
      // elemVal: 'inquiry',
      elemVal: 'businessapplication',
      onlyIfEmpty: false,
      waitTime: 5000
    },
    subCategory: {
      elemId: 'incident.subcategory',
      // elemVal: 'internal application',
      elemVal: 'Reporting Error',
      onlyIfEmpty: false,
      waitTime: 2000
    },
    businessService: {
      elemId: 'sys_display.incident.business_service',
      elemVal: 'hpit:w-webcustcare-prd',
      onlyIfEmpty: true,
      waitTime: 5000
    },
    configItem: {
      elemId: 'sys_display.incident.cmdb_ci',
      elemVal: 'hpit:w-webcustcare-prd',
      onlyIfEmpty: true,
      waitTime: 1000
    },
    contactType: {
      elemId: 'incident.contact_type',
      elemVal: 'email',
      onlyIfEmpty: false,
      waitTime: 1000
    },
    assignmentGroup: {
      elemId: 'sys_display.incident.assignment_group',
      elemVal: 'W-HPI-INCFLS-DCES-WCC-PORTAL',
      onlyIfEmpty: true,
      waitTime: 1000
    },
    assignTo: {
      elemId: 'sys_display.incident.assigned_to',
      elemVal: 'farheen.bahar@hp.com',
      onlyIfEmpty: false,
      waitTime: 5000
    }
  }
};