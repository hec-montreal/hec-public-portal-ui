

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
			
			//we refresh the url with an anchor to indicate the item selected
			var anchor_tab = getUrlAnchorVars();
			anchor_tab['filtre_' + getParameterForItem($(this).attr('data-select-option'))] = $(this).attr('data-select-value');			
			refresh_anchors(anchor_tab);			
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

		//we refresh the url with an anchor to indicate the item selected
		var anchor_tab = getUrlAnchorVars();
		anchor_tab['filtre_lang'] = $(this).attr('data-select-value');			
		refresh_anchors(anchor_tab);
	});
}	

/**
 * Refresh the current url with the anchors associated to the current location
 */
function refresh_anchors(anchor_tab) {
	var filter_anchor = '';
	for ( var anchor_key in anchor_tab) {			
		if (anchor_tab[anchor_key] != '*'){	
				filter_anchor = filter_anchor + '#' + anchor_key + '=' + anchor_tab[anchor_key];
			}
		
	}	
	var href_without_anchors = $(location).attr('href').substring(0, $(location).attr('href').indexOf('#'));
	$(location).attr('href', href_without_anchors + filter_anchor);
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
function displayResultOfficialCourseDescriptionSearch(cdList) {
	if (cdList.length == 0) {
		var emptyRow = "<tr class=\"search_row\" >"
			+ "<td class=\"col-course\" colspan=\"5\">" + $('#bundleDiv').data("message_no_descriptions") + "</td>"
			+ "</tr>";
		$('#searchTable tbody').append(emptyRow);
	}
	
	for ( var i = 0; i < cdList.length; i++) {
	
		var department_group_bundle_key = 'department_' + cdList[i].departmentGroup;
		var career_group_bundle_key = 'career_' + cdList[i].careerGroup;
		var language_bundle_key = 'label_description_' + cdList[i].language.toLowerCase();

		var cdRow = "<tr class=\"search_row\" data-career=\"" + cdList[i].careerGroup + "\" data-department=\"" + cdList[i].departmentGroup + "\" data-language=\"" + cdList[i].language + "\">";
		cdRow += "<td class=\"col-course\">" + cdList[i].course + "</td>";
		cdRow += "<td class=\"col-co\" style=\"text-align:center\"><div class=\"btn-toolbar\">"
		//Button HTML
		 + "<a title=\"" + $('#bundleDiv').data("tooltip_icon_html_course_outline") + "\" class=\"btn\" onMouseDown=\"return openCourseOutlineHTML(\'" + cdList[i].hyphenatedCourseId + "\')\"><i class=\"icon-star icon_button_img\"></i></a>"
		//Button PDF
		+ "<a title=\"" + $('#bundleDiv').data("tooltip_icon_pdf_course_outline") + "\" class=\"btn\" onMouseDown=\"return openCourseOutlinePDF(\'" + cdList[i].hyphenatedCourseId + "\')\">"
		+ "<i class=\"icon-file-pdf icon_button_img\"></i></a>";
		+ "<a class=\"button-microapp\" data-original-title=\"\"><i class=\"icon-file-pdf\"></i></a></div></td>";
		cdRow += "<td class=\"col-department\" data-bundle-key=\"" + department_group_bundle_key + "\">" + departmentDescriptionsMap[cdList[i].departmentGroup] + "</td>";
		cdRow += "<td class=\"col-career\" data-bundle-key=\"" + career_group_bundle_key + "\">" + careerDescriptionsMap[cdList[i].careerGroup] + "</td>";
		cdRow += "<td class=\"col-lang\" data-bundle-key=\"" + language_bundle_key + "\">" + getLanguageDescription(cdList[i].language) + "</td>";
		$('#searchTable tbody').append(cdRow);
	}

	$('#loader-container_search').fadeOut('fast');
	if ($.browser.mozilla) {
		$('#searchTable').addClass("isfirefox");
	}
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
 * return catalog descriptions associated with the "words" passed in parameter
 */
function searchOfficialCourseDescription(words) {
	var cdList = new Array();
	var scope= $('#search_option_scope').attr('data-select-value');
	var url= '/direct/portalManager/getOfficialCourseDescriptions.json?searchWords=' + encodeURIComponent(words) + '&searchScope=' + scope;

	$.ajax({
		url : url,
		datatype : 'json',
		success : function(listCourses) {

					for ( var i = 0; i < listCourses.portalManager_collection.length; i++) {

						var cours= new Array();
						cours["courseid"] = listCourses.portalManager_collection[i].hyphenatedCourseId;
						cours["course"] = listCourses.portalManager_collection[i].hyphenatedCourseId + " - " + listCourses.portalManager_collection[i].title;
						cours["careerGroup"] = listCourses.portalManager_collection[i].careerGroup;
						cours["departmentGroup"] = listCourses.portalManager_collection[i].departmentGroup;
						cours["language"] = listCourses.portalManager_collection[i].lang;
						cdList[i] = cours;
					}
				displayResultOfficialCourseDescriptionSearch(cdList);
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
			$('#direct_course_div').remove();
			$(location).attr('href',getSearchHref());
			launchSearch(getSearchWords());
            return false;
        }
    });
	$("#hLoupe").click(function() {
			$('#direct_course_div').remove();
			$(location).attr('href',getSearchHref());
			launchSearch(getSearchWords());

            return false;
		});
}

/**
 * Return the search words (separed by +) that are in the input box
 */
 function getSearchWords() {
			var searchString = $.trim($("#research_global_button").val());
			var words= searchString.replace(/[\']+/g, " ").replace(/[ ,]+/g, "+");
			return words;
}

/**
 * Return the url parameter to set in order to make the search
 */
 function getSearchHref() {
			return	'#recherche=' + encodeURIComponent(getSearchWords());
}

/**
 * Launch the search with search tab content
 */
function launchSearch(searchText) {
			var textToSearch = searchText.replace(/[\+]+/g, ",");
			$('.menu_tab').removeClass('active');
			$('.tab-pane').removeClass('active');
			$('#par-recherche').addClass('active');
			initiateSearchFilterStatus();
			searchOfficialCourseDescription(textToSearch);
			setCurrentBreadCrumb('search');
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
			+ "<span data-bundle-key=\"button_filter_for_" + itemName + "\"></span><b class=\"caret\"></b></a><ul class=\"dropdown-menu pull-right\" id=\"dropdown_filter_" + itemName + "\">"
			+ "<li data-select-option=\"" + getOtherItem(itemName) + "\" data-select-value=\"*\" class=\"li_filter_list_by_item active\"><a href=\"#dropdown1\" data-toggle=\"tab\" data-bundle-key=\"label_filter_all_" +  getOtherItem(itemName) + "\"></a></li>"
			+"</ul></div></div>"
			+ "<div class=\"btn-group \" style=\"\"><div class=\"dropdown\"><a href=\"#\"  data-toggle=\"dropdown\" class=\"dropdown-toggle \" id=\"filter_by_lang_for_tab_" + itemName + "\" data-select-value=\"*\"><span data-bundle-key=\"button_filter_language\"></span><b class=\"caret\"></b></a><ul class=\"dropdown-menu\">"
			+ "<li class=\"li_filter_by_language active\" data-select-value=\"*\" data-select-option=\"" + itemName + "\"><a href=\"#dropdown2\" data-toggle=\"tab\"  data-bundle-key=\"label_filter_all_language\"></a></li>"
			+ "<li class=\"li_filter_by_language\" data-select-value=\"FR\" data-select-option=\"" + itemName + "\"><a href=\"#dropdown2\" data-toggle=\"tab\"  data-bundle-key=\"button_filter_fr\"></a></li>"
			+ "<li class=\"li_filter_by_language\" data-select-value=\"AN\" data-select-option=\"" + itemName + "\"><a href=\"#dropdown2\" data-toggle=\"tab\"  data-bundle-key=\"button_filter_en\"></a></li>"
			+ "<li class=\"li_filter_by_language\" data-select-value=\"ES\" data-select-option=\"" + itemName + "\"><a href=\"#dropdown2\" data-toggle=\"tab\"  data-bundle-key=\"button_filter_es\"></a></li>"
			+ "</ul></div></div></div><!--  courses --><div class=\"accordion \" id=\"accordionCourseSelect_"	+ itemName + "\"></div><!-- loader --><div id=\"loader-container_" + itemName + "\" class=\"loader-container\"><span data-bundle-key=\"message_loading\"></span><i class=\"icon-loader\"></i></div>";

	$(selectorIdMainDiv).html(div);

	$.ajax({
				url : serviceList,
				datatype : 'json',
				success : function(listItems) {
					for ( var i = 0; i < listItems.portalManager_collection.length; i++) {
						var itemGroup = listItems.portalManager_collection[i].itemGroup;
						var id = itemName + "_" + i;
						var href= '#' + getParameterForItem(itemName) + "=" + itemGroup;
						var item_group_bundle_key = itemName + '_' + itemGroup;

						/* If we filter items from the url (?programme=/?discipline=), we need to select it in the menu*/
						var classSelected='';
						if ($('#dataDiv').data("selected_menu") ==  item_group_bundle_key){
							classSelected='selected_menuitem';
						};

						var div = "<li class=\"\"><a id=\""
								+ id
								+ "\"data-toggle=\"collapse\" data-target=\""
								+ selectorIdDatatarget
								+ "\" href=\"" + href + "\" class=\"ui-link-inherit menuitem " + classSelected + " \" "
								+ " data-bundle-key=\"" + item_group_bundle_key + "\">"
								+ listItems.portalManager_collection[i].description
								+ "</a></li>";
						$(selectorIdTabDiv).append(div);

						var idDiv = '#' + id;
						bindItem(itemName, idDiv, itemGroup, selectorIdListingDiv);

						/* We also populate the Carreer/Department filter boxes*/
						$(selectorSearchSelectBox).append("<li data-select-option=\"" + itemName + "\" data-select-value=\"" + listItems.portalManager_collection[i].itemGroup + "\" class=\"li_select\"><a data-bundle-key=\"" + item_group_bundle_key + "\" href=\"#dropdown1\" data-toggle=\"tab\">" + listItems.portalManager_collection[i].description + "</a></li>");
						$(selectorMenuFilterBox).append("<li data-select-option=\"" + itemName + "\" data-select-value=\"" + listItems.portalManager_collection[i].itemGroup + "\" class=\"li_filter_list_by_item\"><a data-bundle-key=\"" + item_group_bundle_key + "\" href=\"#dropdown1\" data-toggle=\"tab\">" + listItems.portalManager_collection[i].description + "</a></li>");

						/* and insert the career/department descriptions into the map for use later when displaying the courses*/
						if (itemName === "career") {
							careerDescriptionsMap[listItems.portalManager_collection[i].itemGroup] = listItems.portalManager_collection[i].description;
						}
						else if (itemName === "department") {
							departmentDescriptionsMap[listItems.portalManager_collection[i].itemGroup] = listItems.portalManager_collection[i].description;
						}


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
 * Return the parameter we use for the specific item ("programme" for career and "discipline" for department)
 */
function getParameterForItem(itemName) {
	if (itemName == "career"){
		return "programme";
	}
	else{
		return "discipline";
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
 * Return the correct suffix ("fr" "en" or "es") from the filtre_lang utl anchor (FR,AN,ES) that is used to get the language filter bundle key
 */
function getCorrespondingLanguageFilterLocale(itemName) {
	if (itemName == "FR"){
		return "fr";
	}
	if (itemName == "AN"){
		return "en";
	}
	if (itemName == "ES"){
		return "es";
	}
	else{
		return "";
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
	var currentHref = $(location).attr('href')
	var futurHref = currentHref.replace('?' + getOtherLanguage(locale),'?' + locale);
	$(location).attr('href',futurHref);
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

	// set the urls depending on the language
	$('[data-bundle-url-key]').each(function(index, value){
					var key = $(this).attr('data-bundle-url-key');
					var url = $('#bundleDiv').data(key);
					$(this).attr('href', url);
				});

	// select the proper banner image
	if (getLanguage() === 'EN') {
		$('#container_image_portail > img').attr('src', "images/course_portal_directory_960x240.jpg");
	}
	else {
		$('#container_image_portail > img').attr('src', "images/portail-des-cours_hec960x240.jpg");
	}

}

function expandListOfficialCourseDescriptions(itemName, listId, selectorIdListingDiv) {
	expandListOfficialCourseDescriptions(itemName, listId, selectorIdListingDiv, null, null, null, null);
}

/**
 * Expand the catalog descriptions that match the folowing criteria attributes:
 * -itemName: carrer or department -listId: list of department/career ids associated to co we need to populate
 * descriptions belong to -selectorIdListingDiv: selector of the div that we
 * will populate with the associated catalog descriptions -serviceGet: service
 * that get the catalog descriptions for a specific deparment/career the
 * departments/carrer
 */
function expandListOfficialCourseDescriptions(itemName, listId, selectorIdListingDiv, filtre_department, filtre_career, filtre_lang, current_tab) {

	var itemCleaned = listId[0].replace(/[^a-z0-9\s]/gi, '');
	var selectorAccordionCourseDiv = '#accordionCourseSelect_' + itemName;
	var selectorLoader = '#loader-container_' + itemName;
	$(selectorIdListingDiv).fadeIn('fast');

	//first we hide the list of courses and we display the loader bar
	$(selectorAccordionCourseDiv).fadeOut('fast',
		function() {
			$(selectorLoader).fadeIn('fast',function(){

			$.ajax({
				url : '/direct/portalManager/getOfficialCourseDescriptions.json?' + itemName + '=' + listId,
				datatype : 'json',
				success : function(listCourses) {
					$(selectorAccordionCourseDiv).html("");

					var div = "";

					if (listCourses.portalManager_collection.length == 0)
					{
						div += "<div class=\"accordion-group courseToFilter list_by_" + itemName
								+ "\"><div class=\"accordion-heading row\"><div class=\"span5\"><a class=\"accordion-toggle\" style=\"cursor:auto\" >"
								+ $('#bundleDiv').data("message_no_descriptions")
								+ "</a></div></div>";
					}
					else {
						for ( var i = 0; i < listCourses.portalManager_collection.length; i++) {
							var departmentGroup = listCourses.portalManager_collection[i].departmentGroup;
							var careerGroup = listCourses.portalManager_collection[i].careerGroup;
							var department_group_bundle_key = 'department_' + departmentGroup;
							var career_group_bundle_key = 'career_' + careerGroup;

							if(listCourses.portalManager_collection[i].description==null){
								listCourses.portalManager_collection[i].description="<span data-bundle-key=\"label_no_description\"></span>";
							}
							if(listCourses.portalManager_collection[i].requirements==null){
								listCourses.portalManager_collection[i].requirements="<span data-bundle-key=\"label_no_requirement\"></span>";
							}

							div += "<div id=\"\" data-courseId=\""
								+ listCourses.portalManager_collection[i].courseId
								+ "\" data-title=\""
								+ listCourses.portalManager_collection[i].title
								+ "\" data-career=\"" + listCourses.portalManager_collection[i].careerGroup
								+ "\" data-department=\"" + listCourses.portalManager_collection[i].departmentGroup
								+ "\" data-lang=\"" + listCourses.portalManager_collection[i].lang
								+ "\" class=\"accordion-group courseToFilter list_by_" + itemName
								+ "\"><div class=\"accordion-heading row\"><div class=\"span5\"><a class=\"accordion-toggle\" data-toggle=\"collapse\" href=\"#collapseCourse"
								+ "_"
								+ itemCleaned
								+ "_"
								+ i
								+ "\"data-parent=\"#accordionCourseSelect_"
								+ itemName
								+ "\">"
								+ listCourses.portalManager_collection[i].hyphenatedCourseId
								+ " - "
								+ listCourses.portalManager_collection[i].title
								+ "</a><div class=\"toolsWrapper\">";

							//Button HTML
							div += "<a title=\"" + $('#bundleDiv').data("tooltip_icon_html_course_outline") + "\" class=\"icon-button-right button-microapp\" data-original-title=\" Plan de cours enrichi\" onMouseDown=\"return openCourseOutlineHTML(\'" + listCourses.portalManager_collection[i].hyphenatedCourseId + "\')\">"
								+ "<i class=\"icon-star icon_header_img\"></i></a>";

							// Button PDF
							div += "<a title=\"" + $('#bundleDiv').data("tooltip_icon_pdf_course_outline") + "\" onMouseDown=\"return openCourseOutlinePDF(\'" + listCourses.portalManager_collection[i].hyphenatedCourseId + "\')\" "
								+ "data-original-title=\"Plan de cours\" class=\"button-microapp icon-button-right\"><i class=\"icon-file-pdf icon_header_img\"></i></a>";

							div += "</div></div></div></div></div>";
					}}

					$(selectorAccordionCourseDiv).html(div);
					bindFilerByItem();
					bindFilterLanguage();
					bindCollapseProcessing();



					setCurrentBreadCrumb(itemName);
					updateLabelsFromBundle();

					$(selectorAccordionCourseDiv).fadeIn('fast',function() {$(selectorLoader).fadeOut('fast');bindLinkItem();});

					//apply filter from anchor parameters
					if (typeof (filtre_department) !== 'undefined') {
						filterBy('department',filtre_department);

					}
					if (typeof (filtre_career) !== 'undefined') {
						filterBy('career',filtre_career);
					}
					if (typeof (filtre_lang) !== 'undefined') {
						filterByLangForTab(filtre_lang,current_tab);}

					return false;
					}
				});
			});
		});
}

/**
 * Expand the catalog description that match the course id passed in parameter
 */
function expandOfficialCourseDescription(course) {

	$.ajax({
				url : '/direct/portalManager/getOfficialCourseDescription.json?courseId=' + course,
				datatype : 'json',
				success : function(course) {

					var department_group_bundle_key = 'department_' + course.departmentGroup;
					var career_group_bundle_key = 'career_' + course.careerGroup;

					if(course.description==null){
						course.description="<span data-bundle-key=\"label_no_description\"></span>";
					}
					if(course.requirements==null){
						course.requirements="<span data-bundle-key=\"label_no_requirement\"></span>";
					}

					var div = "<div id=\"direct_course_div\" class=\"accordion-group \"><div class=\"accordion-heading row\"><div class=\"span5\"><a class=\"accordion-toggle\" data-toggle=\"collapse\" href=\"#collapseCourse\"data-parent=\"#accordionCourseSelect\">"
							+ course.hyphenatedCourseId
							+ " - "
							+ course.title
							+ "</a><div class=\"toolsWrapper\">";

					//Button HTML
					div += "<a title=\"" + $('#bundleDiv').data("tooltip_icon_html_course_outline") + "\" class=\"icon-button-right button-microapp\" data-original-title=\" Plan de cours enrichi\" onMouseDown=\"return openCourseOutlineHTML(\'" + course.hyphenatedCourseId + "\')\"><i class=\"icon-star icon_header_img\"></i></a>";

					//Button PDF
					div += "<a title=\"" + $('#bundleDiv').data("tooltip_icon_pdf_course_outline") + "\" onMouseDown=\"return openCourseOutlinePDF(\'" + course.hyphenatedCourseId + "\')\" "
							+ "data-original-title=\"Plan de cours\" class=\"button-microapp icon-button-right\"><i class=\"icon-file-pdf\"></i></a>";

					div += "<a class=\"icon-button-right button-microapp\" data-original-title=\"cours archivé\" data-toggle=\"\" href=\"archive.html\"></a></div></div></div><div id=\"collapseCourse\" class=\"accordion-body in collapse\"><div class=\"accordion-inner\"><h4 data-bundle-key=\"label_description\"></h4>"
							+"<br>";
					if (course.shortDescription != null)
                           div += course.shortDescription
                            +"<br><br>";
                    if (course.description != null)
                           div += course.description
							+"<br><br>";
                   if (course.themes != null)
                           div +=
							+ "<h4 data-bundle-key=\"label_theme\">" + $('#bundleDiv').data("label_theme")+ "</h4>"
							+"<br>" + course.themes
							+ "<br><br>"
							+ "<div class=\"btn-toolbar\">";

					// Button HTML
					div += "<a class=\"btn\" onMouseDown=\"return openCourseOutlineHTML(\'" + course.hyphenatedCourseId + "\')\"><i class=\"icon-star icon_button_img\"></i> <span class=\"icon_button_label\" data-bundle-key=\"label_html_course_outline\"></span></a>";

					// Button PDF
					div += "<a class=\"btn\" onMouseDown=\"return openCourseOutlinePDF(\'" + course.hyphenatedCourseId + "\')\">"
							+ "<i class=\"icon-file-pdf icon_button_img\"></i> <span class=\"icon_button_label\" data-bundle-key=\"label_pdf_course_outline\"></span></a>";

					div += "</div><table class=\"table\"><thead><tr><th class=\"col-co-department\" data-bundle-key=\"label_department\"></th><th class=\"col-co-career\" data-bundle-key=\"label_academic_career\"></th><th class=\"col-co-credits\" data-bundle-key=\"label_credits\"></th><th class=\"col-co-requirements\" data-bundle-key=\"label_requirements\"></th></tr></thead><tbody><tr><td>"
							+ "<a data-itemName=\"department\" data-itemGroup=\"" + course.departmentGroup + "\" data-bundle-key=\"" + department_group_bundle_key + "\" href=\"#discipline=" + course.departmentGroup + "\" class=\"linkItemUnicOfficialCourseDescription\">"
							+ departmentDescriptionsMap[course.departmentGroup]
							+ "</a></td><td><a data-itemName=\"career\" data-itemGroup=\"" + course.careerGroup + "\" data-bundle-key=\"" + career_group_bundle_key + "\" href=\"#programme=" + course.careerGroup + "\" class=\"linkItemUnicOfficialCourseDescription\">"
							+ careerDescriptionsMap[course.careerGroup]
							+ "</a></td><td>"
							+ course.credits
							+ "</td><td>"
							+ course.requirements
							+ "</td></tr></tbody></table></div></div></div>";

					$('#my-tab-content').append(div);
					bindLinkItemUnicOfficialCourseDescription();
					$('#current_breadcrumb').html(course.hyphenatedCourseId);
					updateLabelsFromBundle();
					return false;
				},
				statusCode: {
					404: function() {
						var div = "<div id=\"direct_course_div\" class=\"accordion-group \"><div class=\"accordion-heading row\"><div class=\"span5\"><a class=\"accordion-toggle\" style=\"cursor:auto\">"
							+ $('#bundleDiv').data("label_no_description")
							+ "</a></div></div></div>";

						$('#my-tab-content').append(div);
						$('#current_breadcrumb').html(course);
						updateLabelsFromBundle();
						return false;
					}
				}
			});
}

/**
 * Bind the clik event on an item (career/department) to the function that list
 * associated catalog descriptions attributes: -itemName: carrer or department
 * -idDiv: id of the div to bind -itemGroup: id of department/career regroupment associated to the div
 * -selectorIdListingDiv: selector of the div that we will populate with the
 * associated catalog descriptions -serviceGet: service that get the catalog
 * descriptions for a specific deparment/career the departments/carrer
 */
function bindItem(itemName, idDiv, itemGroup, selectorIdListingDiv) {
	$(idDiv).click(
			function() {
				initiateFilter(itemName);
				expandListOfficialCourseDescriptions(itemName, itemGroup.replace(/[\+]+/g, ","), selectorIdListingDiv);
				var selectorMenuItem = '#div_' + itemName + ' .menuitem';
				$(selectorMenuItem).removeClass('selected_menuitem');
				$(this).addClass('selected_menuitem');
				var href= '#' + getParameterForItem(itemName) + "=" + itemGroup;
				$(location).attr('href',href);
			});
}

/**
 * Reinitiate the filter (used when we click on a menu link).
 * parameter: -itemName: carrer or department
 */
function initiateFilter(itemName) {
	var selectorLangFilter = '#filter_by_lang_for_tab_' + itemName;
	var selectorItemFilter = '#filter_by_' + getOtherItem(itemName);
	var selectorLangFilterSpan = selectorLangFilter + ' span';
	var selectorItemFilterSpan = selectorItemFilter + ' span';
	$(selectorLangFilter).attr('data-select-value', '*');
	$(selectorItemFilter).attr('data-select-value', '*');
	$(selectorLangFilterSpan).attr('data-bundle-key', 'button_filter_language');
	$(selectorItemFilterSpan).attr('data-bundle-key', 'button_filter_for_' + itemName);

	var selecorLiItem = '.li_filter_list_by_item[data-select-option=\'' + getOtherItem(itemName) + '\']';
	var selecorLiItemDefault = selecorLiItem + '[data-select-value=\'*\']';
	var selecorLiLanguage = '.li_filter_by_language';
	var selecorLiLanguageDefault = selecorLiLanguage + '[data-select-value=\'*\']';
	$(selecorLiItem).removeClass('active');
	$(selecorLiLanguage).removeClass('active');
	$(selecorLiItemDefault).addClass('active');
	$(selecorLiLanguageDefault).addClass('active');
}

/**
 * Bind the clik event on the links displayed within the catalog description information table (displaying Department/Career/Credits/Requirements)
 * when the catalog description belong to a list of catalog description displayed by carrer/department ("By department"/"By career tab")
 */
function bindLinkItem() {
	$('.linkItem').click(
			function() {
				var itemName = $(this).attr('data-itemName');
				var dataItemGroup = $(this).attr('data-itemGroup');
				var href = $(this).attr('href');
				processLinkItem(itemName, href, dataItemGroup);
			});
}

/**
 * Bind the clik event on the links displayed within the catalog description information table (displaying Department/Career/Credits/Requirements)
 * when the catalog description is theonly one displayed in the page (direct access to a specific catalog description)
 */
function bindLinkItemUnicOfficialCourseDescription() {
	$('.linkItemUnicOfficialCourseDescription').click(
			function() {
				var itemName = $(this).attr('data-itemName');
				var dataItemGroup = $(this).attr('data-itemGroup');
				var href = $(this).attr('href');
				processLinkItem(itemName, href, dataItemGroup);
				$('#direct_course_div').remove();
			});
}

/**
 * Execute the processing when we clik on a link displayed within the catalog description information table (displaying Department/Career/Credits/Requirements)
 * attributes:
 * -itemName: carrer or department
 * -href: href of the link
 * -data-itemGroup: id of department/career regroupment associated to the div
 */
function processLinkItem(itemName, href, dataItemGroup) {
				var otherItem = getOtherItem(itemName);
				var selectorPar = '#par-' + getParameterForItem(itemName);
				var selectorTab = '#tab-' + getParameterForItem(itemName);
				var selectorOtherPar = '#par-' + getParameterForItem(otherItem);
				var selectorOtherTab = '#tab-' + getParameterForItem(otherItem);
				var selectorIdListingDiv = '#' + 'listing_' + itemName;
				expandListOfficialCourseDescriptions(itemName, dataItemGroup.replace(/[\+]+/g, ","), selectorIdListingDiv);
				var selectorMenuItem = '#div_' + itemName + ' .menuitem';
				var selectorMenuItemToSelect = selectorMenuItem + '[href=\"' +  href + '\"]';
				$(selectorMenuItem).removeClass('selected_menuitem');
				$(selectorMenuItemToSelect).addClass('selected_menuitem');
				$(selectorOtherPar).removeClass('active');
				$(selectorOtherTab).removeClass('active');
				$(selectorPar).addClass('active');
				$(selectorTab).addClass('active');
				var href= '#' + getParameterForItem(itemName);
				$(location).attr('href',href);
				$('html, body').animate({ scrollTop: 0 }, 0);
}



/**
 * Get the "anchor" attributes passed into the url variable(ex:#discipline=INTERNAT). This function is called
 * when we used a specific url to display catalog descriptions of a specific
 * department/career/course
 */
function getUrlAnchorVars() {
	var vars = [], hash;
	var hashes = window.location.href.slice(
			window.location.href.indexOf('#') + 1).split('#');
	for ( var i = 0; i < hashes.length; i++) {
		hash = hashes[i].split('=');
		vars[hash[0]] = hash[1];
	}
	return vars;
}

/**
 * Get the "lang" variables passed into the url variable(ex:?FR). This function is called
 * when we want to get the language to display for the portal
 */
function getUrlLang() {
	var vars = [], hash;
	var hashes = window.location.href.slice(
	window.location.href.indexOf('?') + 1).split('#');
	return hashes[0];
}

/**
 * Determine if the tag is present in the url  (ex:#programme). This function is called
 * when we used a specific url to access portal
 */
function isUrlTag(tag) {
	var vars = [], hash;
	var hashes = window.location.href.slice(
			window.location.href.indexOf('#') + 1).split('#');
	for ( var i = 0; i < hashes.length; i++) {
		if (tag == hashes[i]){
			return 1;
		}
	}
	return 0;
}

/**
 * Get the language we use for portail labels (default is french)
 */
function getLanguage() {
	var language = getUrlLang();
	if (language.length === 2) {
		$('#switch_language').attr('data-select-value', getOtherLanguage(language));
		return language;
	}
	else{
		var hrefsplitted = $(location).attr('href').split('#');
		var contextHref = hrefsplitted[0];
		if (typeof (hrefsplitted[1]) !== 'undefined'){
			var anchorHref = '#' + hrefsplitted[1];
			var href=  contextHref + '?FR' + anchorHref;
			$(location).attr('href',href);
			return false;
		}
		else if (contextHref.indexOf("?") === -1){
			var anchorHref = "";
			var href=  contextHref + '?FR' + anchorHref;
			$(location).attr('href',href);
			return false;
		}
		else{
			return false;
		}
	}
}

/**
 * Check whether we used a specific url to display catalog descriptions of a
 * specific department/career/course and display catalog descriptions according
 * to the GET attributes passed into the url.
 */
function filterOfficialCourseDescriptions() {
	var department = getUrlAnchorVars()["discipline"];
	var career = getUrlAnchorVars()["programme"];
	var filtre_department = getUrlAnchorVars()["filtre_discipline"];
	var filtre_career = getUrlAnchorVars()["filtre_programme"];
	var filtre_lang = getUrlAnchorVars()["filtre_lang"];
	var course = getUrlAnchorVars()["cours"];
	var recherche = getUrlAnchorVars()["recherche"];
	var current_tab;
	if (typeof (department) !== 'undefined') {
		current_tab	= 'department';
		$('#par-discipline').addClass('active');
		$('#tab-discipline').addClass('active');
		select_menuitem('department', department);
		expandListOfficialCourseDescriptions('department',department.replace(/[\+]+/g, ","), '#listing_department', filtre_department, filtre_career, filtre_lang, current_tab);
	} else if (typeof (career) !== 'undefined') {
		current_tab	= 'career';
		$('#par-programme').addClass('active');
		$('#tab-programme').addClass('active');
		select_menuitem('career', career);
		expandListOfficialCourseDescriptions('career', career.replace(/[\+]+/g, ","), '#listing_career', filtre_department, filtre_career, filtre_lang, current_tab);
	} else if (typeof (course) !== 'undefined') {
		$('#par-programme').removeClass('active');
		$('#tab-programme').removeClass('active');
		expandOfficialCourseDescription(course);
	}
	else if (typeof (recherche) !== 'undefined') {
		//populate the search box
		$("#research_global_button").val(decodeURIComponent(recherche).replace(/[\+]+/g, " "));
		launchSearch(recherche);
	}
	else if (isUrlTag("discipline")) {
		$('#tab-discipline').addClass('active');
		$('#par-discipline').addClass('active');
		setCurrentBreadCrumb('department');
		current_tab	= 'department';
	}
	else if (isUrlTag("programme")) {
		$('#tab-programme').addClass('active');
		$('#par-programme').addClass('active');
		setCurrentBreadCrumb('career');
		current_tab	= 'career';
	}
}

function filterBy(item, value) {
			var selectorButtonFilter = '#filter_by_' + item;
			var selectorSpanFilter = selectorButtonFilter + ' span';
			if (value == '*'){
				var bundleName = 'button_filter_for_' + item;
			}
			else{
				var bundleName = item + '_' + value ;
			}
			var bundleDescription = $('#bundleDiv').data(bundleName);
			$(selectorButtonFilter).attr('data-select-value',value);

			var bundleDescription = $('#bundleDiv').data(bundleName);
			$(selectorButtonFilter).attr('data-select-value',$(this).attr('data-select-value'));
			applyFilerByItem(getOtherItem($(this).attr('data-select-option')));


			applyFilerByItem(getOtherItem(item));
			var selecorLi = '.li_filter_list_by_item[data-select-option=\'' + item + '\']';
			var selecorLiFiltered = selecorLi + '[data-select-value=\'' + value + '\']';
			$(selecorLi).removeClass('active');
			$(selectorSpanFilter).attr('data-bundle-key',bundleName);
			$(selectorSpanFilter).html(bundleDescription);
			$(selecorLiFiltered).addClass('active');
}

function filterByLangForTab(lang, tab) {
			var selectorButtonFilter = '#filter_by_lang_for_tab_' + tab;
			var selectorSpanFilter = selectorButtonFilter + ' span';
			if (lang == '*'){
				var bundleName = 'button_filter_language';
			}
			else{
				var bundleName = 'button_filter_' + getCorrespondingLanguageFilterLocale(lang) ;
			}
			var bundleDescription = $('#bundleDiv').data(bundleName);
			$(selectorButtonFilter).attr('data-select-value',lang);
			applyFilerByItem(tab);
			var selecorLi = '.li_filter_by_language[data-select-option=\'' + tab + '\']';
			var selecorLiFiltered = selecorLi + '[data-select-value=\'' + lang + '\']';
			$(selecorLi).removeClass('active');
			$(selectorSpanFilter).attr('data-bundle-key',bundleName);
			$(selectorSpanFilter).html(bundleDescription);
			$(selecorLiFiltered).addClass('active');
}


/**
 * Bind click event on tas in order to change the breadcumb value when we switch tabs
 */
function bindTabsSwitch() {
	$('#tabs li > a').click(
			function() {
				var itemName = $(this).attr('data-item-type');
				setCurrentBreadCrumb(itemName);
				$('#direct_course_div').remove();
				var href= '#' + getParameterForItem(itemName);
				var selectorTabMenuSelectedItem = '#div_' + itemName + ' .menuitem.selected_menuitem';
				var hrefSelectedMenuItem = $(selectorTabMenuSelectedItem).attr('href');

				if (typeof (hrefSelectedMenuItem) !== 'undefined') {
					href = hrefSelectedMenuItem;
				}

				$(location).attr('href',href);
			});
}

/**
 * Bind the click event on the accordion header (in order to collapse course informations box) to the processing that changes the css of the collapsed row
 */
function bindCollapseProcessing() {
	$('.accordion-heading.row > .span5 > .accordion-toggle').click(
			function() {

				if ($(this).parent().parent().next().hasClass('in')){
					$(this).parent().parent().next().remove();
					$(this).parent().parent().removeClass("collapsedRow");
					$(this).parent().removeClass("collapsedRow");

			}
				else{
					$(this).parents('.span9').find('.accordion-body.in.collapse').remove();
					$(this).parents('.span9').find('.collapsedRow').removeClass("collapsedRow");
					$(this).parent().parent().addClass("collapsedRow");
					$(this).parent().addClass("collapsedRow");


				var courseid = $(this).parent().parent().parent().attr("data-courseid");
					var courseHeader = $(this).parent().parent();
					$.ajax({
				url : '/direct/portalManager/getOfficialCourseDescription.json?courseId=' + courseid ,
				datatype : 'json',
				success : function(course) {
					var department_group_bundle_key = 'department_' + course.departmentGroup;
					var career_group_bundle_key = 'career_' + course.careerGroup;

					if(course.description==null){
						course.description="<span data-bundle-key=\"label_no_description\">" + $('#bundleDiv').data("label_no_description")+ "</span>";
					}
					if(course.requirements==null){
						course.requirements="<span data-bundle-key=\"label_no_requirement\">" + $('#bundleDiv').data("label_no_requirement")+ "</span>";
					}

					var div = "<div id=\"collapseCourse\" class=\"accordion-body in collapse\"><div class=\"accordion-inner\"><h4 data-bundle-key=\"label_description\">" + $('#bundleDiv').data("label_description")+ "</h4>"
							+"<br>";
                    if (course.shortDescription != null)
                          div += course.shortDescription
                           +"<br><br>";
                   if (course.description != null)
                          div += course.description
                        +"<br><br>";
                    if (course.themes != null)
                            div += "<h4 data-bundle-key=\"label_theme\">" + $('#bundleDiv').data("label_theme")+ "</h4>"
                            +"<br>" + course.themes
							+"<br><br>"
							+ "<div class=\"btn-toolbar\">";

					// Button HTML
					div += "<a class=\"btn\" onMouseDown=\"return openCourseOutlineHTML(\'" + course.hyphenatedCourseId + "\')\"><i class=\"icon-star icon_button_img\"></i> <span class=\"icon_button_label\" data-bundle-key=\"label_html_course_outline\">" + $('#bundleDiv').data("label_html_course_outline")+ "</span></a>";

					// Button PDF
					div += "<a class=\"btn\" onMouseDown=\"return openCourseOutlinePDF(\'" + course.hyphenatedCourseId + "\')\">"
							+ "<i class=\"icon-file-pdf icon_button_img\"></i> <span class=\"icon_button_label\" data-bundle-key=\"label_pdf_course_outline\">" + $('#bundleDiv').data("label_pdf_course_outline")+ "</span></a>";

					div += "</div><table class=\"table\"><thead><tr><th class=\"col-co-department\" data-bundle-key=\"label_department\">" + $('#bundleDiv').data("label_department")+ "</th><th class=\"col-co-career\" data-bundle-key=\"label_academic_career\">" + $('#bundleDiv').data("label_academic_career")+ "</th><th class=\"col-co-credits\" data-bundle-key=\"label_credits\">" + $('#bundleDiv').data("label_credits")+ "</th><th class=\"col-co-requirements\" data-bundle-key=\"label_requirements\">" + $('#bundleDiv').data("label_requirements")+ "</th></tr></thead><tbody><tr><td>"
							+ "<a data-itemName=\"department\" data-itemGroup=\"" + course.departmentGroup + "\" data-bundle-key=\"" + department_group_bundle_key + "\" href=\"#discipline=" + course.departmentGroup + "\" class=\"linkItemUnicOfficialCourseDescription\">"
							+ departmentDescriptionsMap[course.departmentGroup]
							+ "</a></td><td><a data-itemName=\"career\" data-itemGroup=\"" + course.careerGroup + "\" data-bundle-key=\"" + career_group_bundle_key + "\" href=\"#programme=" + course.careerGroup + "\" class=\"linkItemUnicOfficialCourseDescription\">"
							+ careerDescriptionsMap[course.careerGroup]
							+ "</a></td><td>"
							+ course.credits
							+ "</td><td>"
							+ course.requirements
							+ "</td></tr></tbody></table></div>";
						courseHeader.after(div);
						bindLinkItemUnicOfficialCourseDescription();
					
					return false;
				},
				statusCode: {
					404: function() {
						var div = "<div id=\"direct_course_div\" class=\"accordion-group \"><div class=\"accordion-heading row\"><div class=\"span5\"><a class=\"accordion-toggle\" style=\"cursor:auto\">"
							+ $('#bundleDiv').data("label_no_description")
							+ "</a></div></div></div>";
						
						$('#my-tab-content').append(div);	
						$('#current_breadcrumb').html(course);
						updateLabelsFromBundle();					
						return false;
					}
				}
			});
					
		}
		
	});
}

/**
 * higlight in the menu tab the career/department that is currently displayed
 */
function select_menuitem(itemName, itemValue) {
	$('#dataDiv').data("selected_menu",itemName + '_' + itemValue);
}


/**
 * Set the breadcumb with the current position on the site
 */
function setCurrentBreadCrumb(itemName) {
	var bundle_current_breadcumb = 'label_breadcumb_hec_course_by_' + itemName;
	$('#current_breadcrumb').html($('#bundleDiv').data(bundle_current_breadcumb));
	$('#current_breadcrumb').attr('data-bundle-key',bundle_current_breadcumb);
}


/**
 * open the html version of the course outline, otherwise popup an error
 * use a HEAD request to verify that the syllabus exists
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
	// get the url for the pdf from the server
	$.ajax({
		url : '/direct/portalManager/' + courseId + '/public_syllabus.json',
		datatype : 'json',
		success : function(syllabus_info) {		
			if (syllabus_info.data["pdf_url"] !== "") {
			
				//use a head call to verify that the pdf url exists
				// could be simplified if portal manager returned the pdf itself (or we use sdata directly)
				$.ajax({
					type : 'HEAD',
					url : syllabus_info.data["pdf_url"],
					success : function () {
						window.open(syllabus_info.data["pdf_url"], '_blank');
					},
					statusCode: {
						404: function() {
							window.alert($('#bundleDiv').data("message_no_co"));
						},
						// if the pdf does not exist, and the user is not logged in, sdata returns 403
						403: function() {
							window.alert($('#bundleDiv').data("message_no_co"));
						}
					}
				});
			}
			else {
				window.alert($('#bundleDiv').data("message_no_co"));
			}
		},
		statusCode: {
			404: function() {
				window.alert($('#bundleDiv').data("message_no_co"));			
			}
		}
	});
}

// used to keep the language specific descriptions of the
// careers/departments for display later
var careerDescriptionsMap = {};
var departmentDescriptionsMap = {};

/**
 * Script that is executed when the page is loaded
 */
$(document)
		.ready(
				function() {			
					var language = getLanguage();
					$('#tabs').tab();
					$('.collapse').collapse('toggle');
					$('.dropdown-toggle').dropdown();
					
					if (language !== false) {
						getBundle(language);
						bindSearch();		
						initCourseListing('career',
								'/direct/portalManager/getCareers/' + language + '.json');
						initCourseListing('department',
								'/direct/portalManager/getDepartments/' + language + '.json');										
						filterOfficialCourseDescriptions();
						bindChangeLanguage();
						bindTabsSwitch();
						updateLabelsFromBundle();
					}
				});

/**
 * Afficher qu'un div avec un message d'erreur si un des appels ajax plante
 */ 
$('#main').ajaxError(function(event, request, settings) {
	if (request.status != 404 && request.status != 403)
		$(this).html('<div id="error"><h3>Il y a un problème avec le serveur. Veuillez réessayer plus tard.</h3><h3>We are experiencing technical difficulties. Please try again later.</h3></div>');
});