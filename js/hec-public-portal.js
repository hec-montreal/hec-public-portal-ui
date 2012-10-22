

/***************************** "Courses by department/career tab" specific functions *******************************/
	
/**
 * Bind action to execute when we select a filter by career or department for the list of courses displayed
 */
function bindFilerByItem() {	
	$('.li_filter_list_by_item').click(function() {
			var selectorButtonFilter = '#filter_by_' + $(this).attr('data-select-option');
			var selectorSpanFilter = selectorButtonFilter + ' span';						
			if ($(this).attr('data-select-value') == '*'){	
				var bundleName = 'button_filter_for_' + getOtherItem($(this).attr('data-select-option'));
			}
			else{
				var bundleName = $(this).children().attr('data-bundle-key');
			}				
			var bundleDescription = $('#bundleDiv').data(bundleName);			
			$(selectorButtonFilter).attr('data-select-value',$(this).attr('data-select-value'));	
			applyFilerByItem(getOtherItem($(this).attr('data-select-option')));
			var selecorLi = '.li_filter_list_by_item[data-select-option=\'' + $(this).attr('data-select-option') + '\']';
			$(selecorLi).removeClass('active');
			$(selectorSpanFilter).attr('data-bundle-key',bundleName);	
			$(selectorSpanFilter).html(bundleDescription);			
			$(this).addClass('active');
		});
	}	
	
/**
 * Bind action to execute when we select a filter by language for the list of courses displayed
 */
function bindFilterLanguage() {
	$('.li_filter_by_language').click(function() {
		var selectorButtonFilter = '#filter_by_lang_for_tab_' + $(this).attr('data-select-option');	
		var selectorSpanFilter = selectorButtonFilter + ' span';
		if ($(this).attr('data-select-value') == '*'){	
				var bundleName = 'button_filter_language';
			}
			else{
				var bundleName = $(this).children().attr('data-bundle-key');
			}			 		
		var bundleDescription = $('#bundleDiv').data(bundleName);
		$(selectorButtonFilter).attr('data-select-value',$(this).attr('data-select-value'));	
		applyFilerByItem($(this).attr('data-select-option'));
		var selecorLi = '.li_filter_by_language[data-select-option=\'' + $(this).attr('data-select-option') + '\']';
		$(selecorLi).removeClass('active');
		$(selectorSpanFilter).attr('data-bundle-key',bundleName);	
		$(selectorSpanFilter).html(bundleDescription);		
		$(this).addClass('active');
	});
}	

/**
 * Execute the filtering process of a given tab (itemName="career" for courses by career/itemName="department" for courses by department);
 */
function applyFilerByItem(itemName) {
	var filter_item = getFilterItem(getOtherItem(itemName)); 
	var filter_language = getFilterLanguage(itemName);
	var selectorRow = '.courseToFilter.list_by_' + itemName;
	var selectorRowFilter  = selectorRow + filter_item + filter_language;
	$(selectorRow).hide();
	$(selectorRowFilter).show();
}	

/**
 * Get filter selector for an item (department/career)
 */
function getFilterItem(itemName) {

	var selectorButtonFilter = '#filter_by_' + itemName;
	var filter;	
	if($(selectorButtonFilter).attr('data-select-value') == '*') {
		filter = '';
	}	
	else{
	 filter = '[data-' + itemName + '=\'' + $(selectorButtonFilter).attr('data-select-value') + '\']';
	}
	return filter;
}	

/**
 * Get filter selector for the language
 */
function getFilterLanguage(itemName) {
	var selectorLangFilter = '#filter_by_lang_for_tab_' + itemName;
	var filter;	
	if($(selectorLangFilter).attr('data-select-value') == '*') {
		filter = '';
	}	
	else{
	 filter = '[data-lang=\'' + $(selectorLangFilter).attr('data-select-value') + '\']';
	}
	return filter;
}	


/***************************** END "Courses by department/career tab" specific functions *******************************/	
	


/***************************** "Search tab" specific functions *******************************/	

/**
 * Bind action to execute when we select a search option in the Search tab.
 */
function bindSelectSearchOptions() {	
	$('.li_select').click(function() {
			var selectorSpan = '#search_option_' + $(this).attr('data-select-option');				
			var selectionDescription = $(this).children().html();
			$(selectorSpan).html(selectionDescription);	
			$(selectorSpan).attr('data-select-value',$(this).attr('data-select-value'));
			$(selectorSpan).attr('data-bundle-key',$(this).children().attr('data-bundle-key'));
			var selecorLi = '.li_select[data-select-option=\'' + $(this).attr('data-select-option') + '\']';
			$(selecorLi).removeClass('active');
			$(this).addClass('active');			
			applyFilerSearch();
		});
	}
	
/**
 * Execute the filtering process of the Search tab.
 */	
function applyFilerSearch() {	
	var filter_career = getFilterSearch('career'); 
	var filter_department = getFilterSearch('department'); 
	var filter_language = getFilterSearch('language'); 
	var selectorFilter  = '.search_row' + filter_career + filter_department + filter_language;
	$('.search_row').hide();
	$(selectorFilter).show();
}	

/**
 * Initiate the search filter in order to display all departments/careers/languages.
 */	
function initiateSearchFilterStatus() {	
	$('#searchTable tbody').html("");
	$('#loader-container_search').fadeIn('fast');
	initiateSearchFilterForItem('career');
	initiateSearchFilterForItem('department');
	initiateSearchFilterForItem('language');
	var selecorLi = '.li_select';
	var selecorLiActiveDefault = '.li_select[data-select-value=\'*\']';
	$(selecorLi).removeClass('active');
	$(selecorLiActiveDefault).addClass('active');	
}

/**
 * Initiate the search filter for a specific item (department/career/language).
 */	
function initiateSearchFilterForItem(itemName) {	
	var selectorSpan = '#search_option_' + itemName;
	var bundle_filter_all = 'label_filter_all_' + itemName;
	$(selectorSpan).attr('data-select-value', '*');
	$(selectorSpan).attr('data-bundle-key', bundle_filter_all);
	$(selectorSpan).html($('#bundleDiv').data(bundle_filter_all));	
}


/**
 * Get filter selector for an item (department/career/language)
 */
function getFilterSearch(itemName) {
	var selectorSpan = '#search_option_' + itemName;
	var filter;	
	if($(selectorSpan).attr('data-select-value') == '*') {
		filter = '';
	}	
	else{
	 filter = '[data-' + itemName + '=\'' + $(selectorSpan).attr('data-select-value') + '\']';
	}
	return filter;
}



/**
 * create the search result datatable from the catalog description map passed in parameter 
 */
function displayResultCatalogDescriptionSearch(cdList) {	
	for ( var i = 0; i < cdList.length; i++) {
	
		var department_group_bundle_key = 'department_' + cdList[i].departmentGroup;
		var career_group_bundle_key = 'career_' + cdList[i].careerGroup;
		var language_bundle_key = 'label_description_' + cdList[i].language.toLowerCase();
						
		var cdRow = "<tr class=\"search_row\" data-career=\"" + cdList[i].careerGroup + "\" data-department=\"" + cdList[i].departmentGroup + "\" data-language=\"" + cdList[i].language + "\">";
		cdRow += "<td class=\"col-sigle\">" + cdList[i].courseid + "</td>";
		cdRow += "<td class=\"col-nom\">" + cdList[i].coursetitle + "</td>";
		cdRow += "<td class=\"col-co\" style=\"text-align:center\"><div class=\"btn-toolbar\">"
		//Button HTML
		 + "<a class=\"btn\" onMouseDown=\"return openCourseOutlineHTML(\'" + cdList[i].courseid + "\')\"><i class=\"icon-star icon_button_img\"/>  <span class=\"icon_button_label\" data-bundle-key=\"label_html_course_outline\"/></a>"
		//Button PDF
		+ "<a class=\"btn\" href=\"#\" onMouseDown=\"return openCourseOutlinePDF(\'" + cdList[i].courseid + "\')\">"
		+ "<i class=\"icon-file-pdf icon_button_img\"></i> <span class=\"icon_button_label\"/></a>";
		+ "<a href=\"#\" class=\"button-microapp\" data-original-title=\"\"><i class=\"icon-file-pdf\"></i></a></div></td>";		
		cdRow += "<td class=\"col-department\" data-bundle-key=\"" + department_group_bundle_key + "\">" + cdList[i].department + "</td>";
		cdRow += "<td class=\"col-career\" data-bundle-key=\"" + career_group_bundle_key + "\">" + cdList[i].career + "</td>";	
		cdRow += "<td class=\"col-lang\" data-bundle-key=\"" + language_bundle_key + "\">" + getLanguageDescription(cdList[i].language) + "</td>";		
		$('#searchTable tbody').append(cdRow);
	}
		$('#loader-container_search').fadeOut('fast');
}

/**
 * Get the language description from the language code (AN/FR/ES) 
 */
function getLanguageDescription(code) {
	var bundleName = "label_description_" + code.toLowerCase();
	var description = $('#bundleDiv').data(bundleName);
	if (typeof description != "undefined"){
		return description;
	}
	else{
		return $('#bundleDiv').data("label_description_unknown");
	}
	
}

/**
 * return catalog descriptions associated with the "searchString" criteria passed in parameter 
 */
function searchCatalogDescription(searchString) {
	var cdList = new Array();
	var words= searchString.trim().replace(/[\']+/g, " ").replace(/[ ,]+/g, ",").replace(/[ ,]+/g, ",");
	var scope= $('#search_option_scope').attr('data-select-value');
	var url= '/direct/catalogDescription.json?searchWords=' + words + '&searchScope=' + scope;
	
	$.ajax({
		url : url,
		datatype : 'json',
		success : function(listCourses) {

					for ( var i = 0; i < listCourses.catalogDescription_collection.length; i++) {
					
						var cours= new Array();
						cours["courseid"] = listCourses.catalogDescription_collection[i].courseId;
						cours["coursetitle"] = listCourses.catalogDescription_collection[i].title;
						cours["career"] = listCourses.catalogDescription_collection[i].career;
						cours["department"] = listCourses.catalogDescription_collection[i].department;
						cours["careerGroup"] = listCourses.catalogDescription_collection[i].careerGroup;
						cours["departmentGroup"] = listCourses.catalogDescription_collection[i].departmentGroup;
						cours["language"] = listCourses.catalogDescription_collection[i].lang;
						cdList[i] = cours;
					}								
				displayResultCatalogDescriptionSearch(cdList);
				}	
			});
	
}

/**
 * Bind the clik event on search buttons to the corresponding functions
 */
function bindSearch() {
			
	/* click on the search button on the header, visible in all tabs*/		
	$("#research_global_button").keypress(function(e) {
        if(e.which == 13) {
            launchSearch();
			return false;
        }
    });
	$("#research_global_logo").click(function() {
			launchSearch();
			return false;
		});
}

/**
 * Launch the search with search tab content
 */
function launchSearch() {
			var searchText = $("#research_global_button").val();			
			$('.menu_tab').removeClass('active');
			$('.tab-pane').removeClass('active');
			$('#par-recherche').addClass('active');				
			initiateSearchFilterStatus();
			searchCatalogDescription(searchText);	
}
		


/***************************** END "Search tab" specific functions *******************************/		
	

/***************************** Other functions *******************************/	

/**
 * Get a catalog description and initialize the editor dialog box attributes:
 * -itemName: carrer or department -serviceList: service that list all the
 * departments/career that should be available for browsing -serviceGet: service
 * that get the catalog descriptions for a specific deparment/career the
 * departments/carrer
 */
function initCourseListing(itemName, serviceList) {

	var selectorIdTabDiv = '#div_' + itemName;
	var selectorIdDatatarget = '#courseListing_' + itemName;
	var selectorIdMainDiv = '#divCourseListing_' + itemName;
	var idListingDiv = 'listing_' + itemName;
	var idListingSearchLi = 'li_' + itemName;
	var selectorIdListingDiv = '#' + idListingDiv;
	var selectorSearchSelectBox = 	'#dropdown-menu_' + itemName;
	var selectorMenuFilterBox = 	'#dropdown_filter_' + getOtherItem(itemName); 
	
	

	var div = "<div id=\""
			+ idListingDiv
			+ "\" class=\" in \" style=\"display: none; \">"
			+ "<div class=\"filter_bar  navbar\"><div class=\"btn-group \" style=\"\"><div class=\"dropdown\"><a href=\"#\"  data-toggle=\"dropdown\" class=\"dropdown-toggle\"  id=\"filter_by_" + getOtherItem(itemName) + "\" data-select-value=\"*\">"
			+ "<span data-bundle-key=\"button_filter_for_" + itemName + "\"/><b class=\"caret\"></a></b><ul class=\"dropdown-menu pull-right\" id=\"dropdown_filter_" + itemName + "\">"
			+ "<li data-select-option=\"" + getOtherItem(itemName) + "\" data-select-value=\"*\" class=\"li_filter_list_by_item active\"><a href=\"#dropdown1\" data-toggle=\"tab\" data-bundle-key=\"button_filter_all\"></a></li>"					
			+"</ul></div></div>"
			+ "<div class=\"btn-group \" style=\"\"><div class=\"dropdown\"><a href=\"#\"  data-toggle=\"dropdown\" class=\"dropdown-toggle \" id=\"filter_by_lang_for_tab_" + itemName + "\" data-select-value=\"*\"><span data-bundle-key=\"button_filter_language\"/><b class=\"caret\"></b></a><ul class=\"dropdown-menu\">"
			+ "<li class=\"li_filter_by_language active\" data-select-value=\"*\" data-select-option=\"" + itemName + "\"><a href=\"#dropdown2\" data-toggle=\"tab\"  data-bundle-key=\"button_filter_all\"></a></li>"
			+ "<li class=\"li_filter_by_language\" data-select-value=\"FR\" data-select-option=\"" + itemName + "\"><a href=\"#dropdown2\" data-toggle=\"tab\"  data-bundle-key=\"button_filter_fr\"></a></li>"
			+ "<li class=\"li_filter_by_language\" data-select-value=\"AN\" data-select-option=\"" + itemName + "\"><a href=\"#dropdown2\" data-toggle=\"tab\"  data-bundle-key=\"button_filter_en\"></a></li>"
			+ "<li class=\"li_filter_by_language\" data-select-value=\"ES\" data-select-option=\"" + itemName + "\"><a href=\"#dropdown2\" data-toggle=\"tab\"  data-bundle-key=\"button_filter_es\"></a></li>"
			+ "</ul></div></div></div><!--  courses --><div class=\"accordion \" id=\"accordionCourseSelect_"	+ itemName + "\"></div><!-- loader --><div id=\"loader-container_" + itemName + "\" class=\"loader-container\"><span data-bundle-key=\"message_loading\"/><i class=\"icon-loader\"></i></div>";
			
	$(selectorIdMainDiv).html(div);

	$
			.ajax({
				url : serviceList,
				datatype : 'json',
				success : function(listItems) {				
					for ( var i = 0; i < listItems.portalManager_collection.length; i++) {
						var listId = listItems.portalManager_collection[i].listId;
						var id = itemName + "_" + i;
						var item_group_bundle_key = itemName + '_' + listItems.portalManager_collection[i].itemGroup;
						var div = "<li class=\"\"><a id=\""
								+ id
								+ "\"data-toggle=\"collapse\" data-target=\""
								+ selectorIdDatatarget
								+ "\" href=\"#\" class=\"ui-link-inherit menuitem\""
								+ " data-bundle-key=\"" + item_group_bundle_key + "\">"
								+ listItems.portalManager_collection[i].description
								+ "</a></li>";
						$(selectorIdTabDiv).append(div);
						var idDiv = '#' + id;
						bindItem(itemName, idDiv, listId, selectorIdListingDiv);
						
						/* We also populate the Carreer/Department filter boxes*/
						$(selectorSearchSelectBox).append("<li data-select-option=\"" + itemName + "\" data-select-value=\"" + listItems.portalManager_collection[i].itemGroup + "\" class=\"li_select\"><a data-bundle-key=\"" + item_group_bundle_key + "\" href=\"#dropdown1\" data-toggle=\"tab\">" + listItems.portalManager_collection[i].description + "</a></li>");
						$(selectorMenuFilterBox).append("<li data-select-option=\"" + itemName + "\" data-select-value=\"" + listItems.portalManager_collection[i].itemGroup + "\" class=\"li_filter_list_by_item\"><a data-bundle-key=\"" + item_group_bundle_key + "\" href=\"#dropdown1\" data-toggle=\"tab\">" + listItems.portalManager_collection[i].description + "</a></li>");						
					}					
					bindSelectSearchOptions();
				}
			});
}


/**
 * Return "career" if we pass "department" in parameter and vice versa
 */
function getOtherItem(itemName) {	
	if (itemName == "career"){
		return "department";
	}
	else{
		return "career";
	}
}	

/**
 * Return "FR" if we pass "EN" in parameter and vice versa
 */
function getOtherLanguage(itemName) {	
	if (itemName == "FR"){
		return "EN";
	}
	else{
		return "FR";
	}
}
	
/**
 * Bind "change language" buttons (french/english) to the 
 * "change local" behaviour : all attributes with internationalized labels are reloaded in the new language.
 */
function bindChangeLanguage() {
	$('#switch_language').click(function() {
	var locale = $(this).attr('data-select-value');
	$(this).attr('data-select-value', getOtherLanguage(locale));
	getBundle(locale);
	});
}

/**
 * Get the bundle associated with the locale(french/english/espagnol) and store it in local
 * attributes: -locale: the locale selected by the user
 */
function getBundle(locale) {

	$.ajax({
		url : '/direct/portalManager/getBundles/' + locale + '.json',
		datatype : 'json',
		success : function(msgsBundle) {
			$('#bundleDiv').data(msgsBundle.data);	
			updateLabelsFromBundle();
		}		
	});
}

/**
 * Reload all attributes with internationalized labels from the current locale bundle
 */
function updateLabelsFromBundle() {
	$('[data-bundle-key]').each(function(index, value){
					var key = $(this).attr('data-bundle-key');
					var text = $('#bundleDiv').data(key);
					$(this).text(text);
				});
}


/**
 * Expand the catalog descriptions that match the folowing criteria attributes:
 * -itemName: carrer or department -listId: list of department/career ids associated to co we need to populate
 * descriptions belong to -selectorIdListingDiv: selector of the div that we
 * will populate with the associated catalog descriptions -serviceGet: service
 * that get the catalog descriptions for a specific deparment/career the
 * departments/carrer
 */
function expandListCatalogDescriptions(itemName, listId, selectorIdListingDiv) {

	var itemCleaned = listId[0].replace(/[^a-z0-9\s]/gi, '');
	var selectorAccordionCourseDiv = '#accordionCourseSelect_' + itemName;
	var selectorAccordionCourseDiv = '#accordionCourseSelect_' + itemName;	
	var selectorLoader = '#loader-container_' + itemName;																		
	$(selectorIdListingDiv).fadeIn('fast');
				//first we hide the list of courses and we display the loader bar
				$(selectorAccordionCourseDiv).fadeOut('fast', 
					function() {
						$(selectorLoader).fadeIn('fast',function(){
							$
			.ajax({
				url : '/direct/catalogDescription.json?' + itemName + '=' + listId,
				datatype : 'json',
				success : function(listCourses) {
					$(selectorAccordionCourseDiv).html("");

					var div = "";

					for ( var i = 0; i < listCourses.catalogDescription_collection.length; i++) {
					
						var department_group_bundle_key = 'department_' + listCourses.catalogDescription_collection[i].departmentGroup;
						var career_group_bundle_key = 'career_' + listCourses.catalogDescription_collection[i].careerGroup;
						
						if(listCourses.catalogDescription_collection[i].description==null){
							listCourses.catalogDescription_collection[i].description="<span data-bundle-key=\"label_no_description\"/>";
						}
						if(listCourses.catalogDescription_collection[i].requirements==null){
							listCourses.catalogDescription_collection[i].requirements="<span data-bundle-key=\"label_no_requirement\"/>";
						}									
									
						div += "<div id=\"\" data-courseId=\""
								+ listCourses.catalogDescription_collection[i].courseId
								+ "\" data-title=\""
								+ listCourses.catalogDescription_collection[i].title								
								+ "\" data-career=\"" + listCourses.catalogDescription_collection[i].careerGroup 
								+ "\" data-department=\"" + listCourses.catalogDescription_collection[i].departmentGroup
								+ "\" data-lang=\"" + listCourses.catalogDescription_collection[i].lang
								+ "\" class=\"accordion-group courseToFilter list_by_" + itemName
								+ "\"><div class=\"accordion-heading row\"><div class=\"span5\"><a class=\"accordion-toggle\" data-toggle=\"collapse\" href=\"#collapseCourse"
								+ "_"
								+ itemCleaned
								+ "_"
								+ i
								+ "\"data-parent=\"#accordionCourseSelect_"
								+ itemName
								+ "\">"
								+ listCourses.catalogDescription_collection[i].courseId
								+ " - "
								+ listCourses.catalogDescription_collection[i].title
								+ "</a><div class=\"toolsWrapper\">";
						
						//Button HTML
						div += "<a class=\"icon-button-right button-microapp\" data-original-title=\" Plan de cours enrichi\" onMouseDown=\"return openCourseOutlineHTML(\'" + listCourses.catalogDescription_collection[i].courseId + "\')\">"
								+ "<i class=\"icon-star icon_header_img\"></i></a>";
						
						// Button PDF
						div += "<a href=\"#\" onMouseDown=\"return openCourseOutlinePDF(\'" + listCourses.catalogDescription_collection[i].courseId + "\')\" "
								+ "data-original-title=\"Plan de cours\" class=\"button-microapp icon-button-right\"><i class=\"icon-file-pdf icon_header_img\"></i></a>";

						div += "</div></div></div><div id=\"collapseCourse"
								+ "_"
								+ itemCleaned
								+ "_"
								+ i
								+ "\"class=\"accordion-body collapse\"><div class=\"accordion-inner\"><h4  data-bundle-key=\"label_description\"></h4>"
								+ "<br>"
								+ listCourses.catalogDescription_collection[i].description
								+ "<br><br>"
								+ "<div class=\"btn-toolbar\">";
								
						//Button HTML
						div += "<a class=\"btn\" onMouseDown=\"return openCourseOutlineHTML(\'" + listCourses.catalogDescription_collection[i].courseId + "\')\"><i class=\"icon-star icon_button_img\"/>  <span class=\"icon_button_label\" data-bundle-key=\"label_html_course_outline\"/></a>";

						//Button PDF
						div += "<a class=\"btn\" href=\"#\" onMouseDown=\"return openCourseOutlinePDF(\'" + listCourses.catalogDescription_collection[i].courseId + "\')\">"
								+ "<i class=\"icon-file-pdf icon_button_img\"></i> <span class=\"icon_button_label\" data-bundle-key=\"label_pdf_course_outline\"/></a>";

						div += "</div><table class=\"table\"><thead><tr><th class=\"col-co-department\"  data-bundle-key=\"label_department\"></th><th class=\"col-co-career\" data-bundle-key=\"label_academic_career\"></th><th class=\"col-co-credits\" data-bundle-key=\"label_credits\"></th><th class=\"col-co-requirements\" data-bundle-key=\"label_requirements\"></th></tr></thead><tbody><tr><td><a data-bundle-key=\"" + department_group_bundle_key + "\" href=\"#\" >"
								+ listCourses.catalogDescription_collection[i].department
								+ "</a></td><td><a data-bundle-key=\"" + career_group_bundle_key + "\" href=\"#\">"
								+ listCourses.catalogDescription_collection[i].career
								+ "</a></td><td>"
								+ listCourses.catalogDescription_collection[i].credits
								+ "</td><td>"
								+ listCourses.catalogDescription_collection[i].requirements
								+ "</td></tr></tbody></table></div></div></div>";
					}

					$(selectorAccordionCourseDiv).html(div);					
					bindFilerByItem();
					bindFilterLanguage();
					updateLabelsFromBundle();		
					var selectorLoader = '#loader-container_' + itemName;	
					$(selectorAccordionCourseDiv).fadeIn('fast',function() {$(selectorLoader).fadeOut('fast')});					
					return false;
				}
			});		
		});		
	});	
}

/**
 * Expand the catalog description that match the course id passed in parameter
 */
function expandCatalogDescription(course) {

	$.ajax({
				url : '/direct/catalogDescription/' + course + '.json',
				datatype : 'json',
				success : function(course) {
				
					var department_group_bundle_key = 'department_' + course.departmentGroup;
					var career_group_bundle_key = 'career_' + course.careerGroup;						
					
					if(course.description==null){
						course.description="<span data-bundle-key=\"label_no_description\"/>";
					}
					if(course.requirements==null){
						course.requirements="<span data-bundle-key=\"label_no_requirement\"/>";
					}

					var div = "<div id=\"\" class=\"accordion-group \"><div class=\"accordion-heading row\"><div class=\"span5\"><a class=\"accordion-toggle\" data-toggle=\"collapse\" href=\"#collapseCourse\"data-parent=\"#accordionCourseSelect\">"
							+ course.courseId
							+ " - "
							+ course.title
							+ "</a><div class=\"toolsWrapper\">";

					//Button HTML
					div += "<a class=\"icon-button-right button-microapp\" data-original-title=\" Plan de cours enrichi\" onMouseDown=\"return openCourseOutlineHTML(\'" + course.courseIf + "\')\"><i class=\"icon-star icon_header_img\"></i></a>";
							
					//Button PDF
					div += "<a href=\"#\" onMouseDown=\"return openCourseOutlinePDF(\'" + course.courseId + "\')\" "
							+ "data-original-title=\"Plan de cours\" class=\"button-microapp icon-button-right\"><i class=\"icon-file-pdf\"></i></a>";

					div += "<a class=\"icon-button-right button-microapp\" data-original-title=\"cours archivé\" data-toggle=\"\" href=\"archive.html\"></a></div></div></div><div id=\"collapseCourse\" class=\"accordion-body in collapse\"><div class=\"accordion-inner\"><h4 data-bundle-key=\"label_description\"></h4>"
							+"<br>"
							+ course.description
							+"<br><br>"
							+ "<div class=\"btn-toolbar\">";

					// Button HTML
					div += "<a class=\"btn\" onMouseDown=\"return openCourseOutlineHTML(\'" + course.courseIf + "\')\"><i class=\"icon-star icon_button_img\"/> <span class=\"icon_button_label\" data-bundle-key=\"label_html_course_outline\"/></a>";

					// Button PDF
					div += "<a class=\"btn\" href=\"#\" onMouseDown=\"return openCourseOutlinePDF(\'" + course.courseId + "\')\">"
							+ "<i class=\"icon-file-pdf icon_button_img\"></i> <span class=\"icon_button_label\" data-bundle-key=\"label_pdf_course_outline\"/></a>";

					div += "</div><table class=\"table\"><thead><tr><th class=\"col-co-department\" data-bundle-key=\"label_department\"></th><th class=\"col-co-career\" data-bundle-key=\"label_academic_career\"></th><th class=\"col-co-credits\" data-bundle-key=\"label_credits\"></th><th class=\"col-co-requirements\" data-bundle-key=\"label_requirements\"></th></tr></thead><tbody><tr><td><a data-bundle-key=\"" + department_group_bundle_key + "\" href=\"#\" >"
							+ course.department
							+ "</a></td><td><a data-bundle-key=\"" + career_group_bundle_key + "\" href=\"#\">"
							+ course.career
							+ "</a></td><td>"
							+ course.credits
							+ "</td><td>"
							+ course.requirements
							+ "</td></tr></tbody></table></div></div></div>";

					$('#my-tab-content').append(div);
					updateLabelsFromBundle();
					return false;
				}
			});
}

/**
 * Bind the clik event on an item (career/department) to the function that list
 * associated catalog descriptions attributes: -itemName: carrer or department
 * -idDiv: id of the div to bind -listId: list of department/career ids associated to the div
 * -selectorIdListingDiv: selector of the div that we will populate with the
 * associated catalog descriptions -serviceGet: service that get the catalog
 * descriptions for a specific deparment/career the departments/carrer
 */
function bindItem(itemName, idDiv, listId, selectorIdListingDiv) {
	$(idDiv).click(
			function() {
				$('.menuitem').removeClass('selected_menuitem');
				$(this).addClass('selected_menuitem');	
				expandListCatalogDescriptions(itemName, listId, selectorIdListingDiv);
			});
}


/**
 * Get the GET attributes passed into the url variable. This function is called
 * when we used a specific url to display catalog descriptions of a specific
 * department/career/course
 */
function getUrlVars() {
	var vars = [], hash;
	var hashes = window.location.href.slice(
			window.location.href.indexOf('?') + 1).split('&');
	for ( var i = 0; i < hashes.length; i++) {
		hash = hashes[i].split('=');
		vars.push(hash[0]);
		vars[hash[0]] = hash[1];
	}
	return vars;
}

/**
 * Check whether we used a specific url to display catalog descriptions of a
 * specific department/career/course and display catalog descriptions according
 * to the GET attributes passed into the url.
 */
function filterCatalogDescriptions() {
	var department = getUrlVars()["discipline"];
	var career = getUrlVars()["programme"];
	var course = getUrlVars()["cours"];
	if (typeof (department) !== 'undefined') {
		$('#par-responsable').addClass('active');
		$('#par-programme').removeClass('active');
		$('#tab_responsable').addClass('active');
		$('#tab_programme').removeClass('active');
		expandListCatalogDescriptions('department',getUrlVars()["discipline"], '#listing_department');
	} else if (typeof (career) !== 'undefined') {
		expandListCatalogDescriptions('career',getUrlVars()["programme"], '#listing_career');
	} else if (typeof (course) !== 'undefined') {
		$('#par-programme').removeClass('active');
		$('#tab_programme').removeClass('active');
		expandCatalogDescription(course);
		$('#tabs').hide();
		$('#navbar-search').hide();
		$('#research_global_logo').hide();		
	}
}

/**
 * open the html version of the course outline, otherwise popup an error
 */
function openCourseOutlineHTML(courseId) {
	var url = '/direct/portalManager/' + courseId + '/public_syllabus.html';
	$.ajax({
		type : 'HEAD',
		url : url,
		success : function () {
			window.open(url, '_blank');
		},
		statusCode: {
			404: function() {
				window.alert($('#bundleDiv').data("message_no_co"));
			}
		}
	});
}

/**
 * open the pdf for the course outline of the course associated with this catalog description
 */
function openCourseOutlinePDF(courseId) {
	$.ajax({
		url : '/direct/portalManager/' + courseId + '/public_syllabus.json',
		datatype : 'json',
		success : function(syllabus_info) {		
			if (syllabus_info.data["pdf_url"] !== "") {
				window.open(syllabus_info.data["pdf_url"], '_blank');
			}
			else {
				window.alert($('#bundleDiv').data("message_no_co"));
			}
			return true;
		},
		error : function(jqXHR, textStatus, errorThrown) {
			window.alert(errorThrown);
		}
	});
}


/**
 * Script that is executed when the page is loaded
 */
$(document)
		.ready(
				function() {			
					
					$('#tabs').tab();
					$('.collapse').collapse('toggle');
					$('.dropdown-toggle').dropdown();									
					getBundle('FR');
					bindSearch();
					initCourseListing('career',
							'/direct/portalManager/getCareers/FR.json');
					initCourseListing('department',
							'/direct/portalManager/getDepartments/FR.json');
					filterCatalogDescriptions();
					bindChangeLanguage();
					updateLabelsFromBundle();
				});
