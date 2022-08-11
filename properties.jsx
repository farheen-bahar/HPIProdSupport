module.exports = {
  login: {
    domain: 'https://login.external.hp.com',
    loadingTime: 10000,
    usernameId: 'username',
    passwordId: 'password',
    submitButton: 'input[type="submit"]'
  },
  dashboard: {
    // url: 'https://hpitprod.service-now.com/nav_to.do?uri=%2Fincident_list.do%3Fsysparm_query%3Dassignment_groupDYNAMICd6435e965f510100a9ad2572f2b47744%255Eassigned_toISEMPTY%255EstateNOT%2520IN6%252C7%26sysparm_first_row%3D1%26sysparm_view%3D',
    // url: 'https://hpitprod.service-now.com/nav_to.do?uri=%2Fincident_list.do%3Fsysparm_view%3D%26sysparm_query%3Dassignment_groupDYNAMICd6435e965f510100a9ad2572f2b47744%255Eassigned_to%253D%26sysparm_fixed_query%3D',
    url: 'https://hpitprod.service-now.com/nav_to.do?uri=%2Fincident_list.do%3Fsysparm_query%3Dassignment_groupDYNAMICd6435e965f510100a9ad2572f2b47744%255Eassigned_toISEMPTY%255EstateNOT%2520IN7%26sysparm_first_row%3D1%26sysparm_view%3D',
    // url: 'https://hpitprod.service-now.com/nav_to.do?uri=%2Fincident_list.do%3Fsysparm_query%3Dassignment_groupDYNAMICd6435e965f510100a9ad2572f2b47744%255Eshort_descriptionSTARTSWITHRULE%255Estate%253D6%26sysparm_first_row%3D1%26sysparm_view%3D',
    minExecutionTime: 120000,
    loadingTime: 20000,
    contentIFrameIndex: 'gsft_main'
  },
  incidents: {
    linkSelector: 'a.linked.formlink',
    loadingTime: 20000,
    saveButton: {
      selector: '#sysverb_update',
      text: 'Save and Exit',
      waitTime: 15000
    },
    verifyURL: 'https://hpitprod.service-now.com/incident_list.do'
  },
  updateFields: {
    impactedUser: {
      elemId: 'sys_display.incident.u_impacted_user',
      // elemVal: 'Farheen Bahar',
      elemVal: 'farheen.bahar@hp.com',
      onlyIfEmpty: true,
      waitTime: 7000
    },
    category: {
      elemId: 'incident.category',
      // elemVal: 'inquiry',
      elemVal: 'businessapplication',
      // altElemVal: 'monitoring',
      altElemVal: 'businessapplication',
      onlyIfEmpty: false,
      waitTime: 7000
    },
    subCategory: {
      elemId: 'incident.subcategory',
      // elemVal: 'internal application',
      elemVal: 'Data error/ missing data',
      // altElemVal: 'Application',
      altElemVal: 'Monitoring',
      onlyIfEmpty: false,
      waitTime: 10000
    },
    businessService: {
      elemId: 'sys_display.incident.business_service',
      elemVal: 'hpit:w-webcustcare-prd',
      // elemVal: '201081',
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
      // elemVal: 'farheen.bahar@hp.com',
      elemVal: 'ashan.johny@hp.com',
      altElemVal: 'ashok.kumar5@hp.com',
      onlyIfEmpty: false,
      waitTime: 5000
    },
    description: {
      elemId: 'incident.short_description',
      phrases: ['Rule name:', 'SIS', 'URL', 'Splunk'],
    }
  }
};