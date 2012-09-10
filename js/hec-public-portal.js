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
	var selectorIdListingDiv = '#' + idListingDiv;

	$
			.ajax({
				url : serviceList,
				datatype : 'json',
				success : function(listItems) {
					for ( var i = 0; i < listItems.portalManager_collection.length; i++) {
						var item = listItems.portalManager_collection[i].id;
						var id = itemName + "_" + i;
						var div = "<dd class=\"\"><a id=\""
								+ id
								+ "\"data-toggle=\"collapse\" data-target=\""
								+ selectorIdDatatarget
								+ "\" href=\"#\" class=\"ui-link-inherit menuitem\">"
								+ listItems.portalManager_collection[i].description
								+ "</a></dd>";
						$(selectorIdTabDiv).append(div);
						var idDiv = '#' + id;

						var div = "<div id=\""
								+ idListingDiv
								+ "\" class=\" in \" style=\"display: none; \"><div class=\"btn-group\" style=\"\"><div class=\"dropdown\"><a href=\"#\" class=\"dropdown-toggle btn\" data-toggle=\"dropdown\">Trier <b class=\"caret\"></b></a><ul class=\"dropdown-menu\"><li><a href=\"#dropdown1\" data-toggle=\"tab\">Par ordre alphab�tique</a></li><li><a href=\"#dropdown2\" data-toggle=\"tab\">Par num�ro de cours</a></li><li><a href=\"#dropdown2\" data-toggle=\"tab\">Par ordre de sigle</a></li></ul></div></div><div class=\"btn-group\"><a href=\"#\" class=\"btn active\">Tous les cours</a><a href=\"#\" class=\"btn\">En fran�ais</a><a href=\"#\" class=\"btn\">En anglais</a><a href=\"#\" class=\"btn\">En espagnol</a></div><div class=\"accordion\" id=\"accordionCourseSelect\"></div></div>";
						$(selectorIdMainDiv).html(div);
						bindItem(itemName, idDiv, item, selectorIdListingDiv);

					}
				}
			});
}

/**
 * Bind "change language" buttons (french/english/spanish) to the 
 * "change local" behaviour : all attributes with internationalized labels are reloaded in the new language.
 */
function bindChangeLanguage() {
	$('.lang_fr').click(function() {
		getBundle('FR');
		$('.lang_en').removeClass('active');
		$('.lang_es').removeClass('active');
		$('.lang_fr').addClass('active');
	});

	$('.lang_en').click(function() {
		getBundle('EN');
		$('.lang_fr').removeClass('active');
		$('.lang_es').removeClass('active');
		$('.lang_en').addClass('active');
	});

	$('.lang_es').click(function() {
		getBundle('ES');
		$('.lang_fr').removeClass('active');
		$('.lang_en').removeClass('active');		
		$('.lang_es').addClass('active');
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
 * Bind "sorting buttons" (sort by course id/ sort by title) to the sorting
 * behaviour 
 * attributes: -selectorAccordionCourseDiv: selector of the div that is being
 * sorted (accordionCourseSelect_department/accordionCourseSelect_career)
 */
function bindSort(selectorAccordionCourseDiv) {
	
	$('.sort_course_id').click(function() {
		sortByCourseId(selectorAccordionCourseDiv);
		});

	$('.sort_title').click(function() {
		sortByTitle(selectorAccordionCourseDiv);
		});
	sortByCourseId(selectorAccordionCourseDiv);	
	
}

function sortByTitle(selectorAccordionCourseDiv) {
		$('.sort_title').addClass('active');
		$('.sort_course_id').removeClass('active');
		
		var listCoursesSorted = $('.courseToSort').sort(function(a, b) {
			return $(a).attr('data-title') > $(b).attr('data-title') ? 1 : -1;
		});
		$(selectorAccordionCourseDiv).html(listCoursesSorted);
}

function sortByCourseId(selectorAccordionCourseDiv) {
		$('.sort_course_id').addClass('active');
		$('.sort_title').removeClass('active');

		var listCoursesSorted = $('.courseToSort').sort(function(a, b) {
			return $(a).attr('data-courseId') > $(b).attr('data-courseId') ? 1 : -1;
		});
		$(selectorAccordionCourseDiv).html(listCoursesSorted);
}

/**
 * Bind "language filtering buttons" (french/english/spanish) to the filtering
 * behaviour
 */
function bindFilters() {
	$('.filter_fr').click(function() {
		$('.courseToFilter').hide();
		$('.FR').show();
		$('.btn').removeClass('active');
		$('.filter_fr').addClass('active');
	});

	$('.filter_en').click(function() {
		$('.courseToFilter').hide();
		$('.AN').show();
		$('.btn').removeClass('active');
		$('.filter_en').addClass('active');
	});

	$('.filter_es').click(function() {
		$('.courseToFilter').hide();
		$('.ES').show();
		$('.btn').removeClass('active');
		$('.filter_es').addClass('active');
	});

	$('.filter_all').click(function() {
		$('.courseToFilter').show();
		$('.btn').removeClass('active');
		$('.filter_all').addClass('active');
	});
}

/**
 * Expand the catalog descriptions that match the folowing criteria attributes:
 * -itemName: carrer or department -item: item (department/career) catalog
 * descriptions belong to -selectorIdListingDiv: selector of the div that we
 * will populate with the associated catalog descriptions -serviceGet: service
 * that get the catalog descriptions for a specific deparment/career the
 * departments/carrer
 */
function expandListCatalogDescriptions(itemName, item, selectorIdListingDiv) {

	var itemCleaned = item.replace(/[^a-z0-9\s]/gi, '');
	var selectorAccordionCourseDiv = '#accordionCourseSelect_' + itemName;

	$
			.ajax({
				url : '/direct/catalogDescription.json?' + itemName + '=' + item,
				datatype : 'json',
				success : function(listCourses) {
					$(selectorIdListingDiv).html("");

					var div = "<div class=\"btn-toolbar well\"><div class=\"btn-group \" style=\"\"><div class=\"dropdown\"><a href=\"#\"  data-toggle=\"dropdown\" class=\"dropdown-toggle btn \" data-bundle-key=\"button_sort\"><b class=\"caret\"></b></a><ul class=\"dropdown-menu\"><li class=\"sort_title\"><a href=\"#dropdown1\" data-toggle=\"tab\"  data-bundle-key=\"button_sort_alphabetic\"></a></li><li class=\"sort_course_id\"><a href=\"#dropdown2\" data-toggle=\"tab\"  data-bundle-key=\"button_sort_numeric\"></a></li></ul></div></div><div class=\"btn-group\"><a href=\"#\" class=\"btn active filter_all \" data-bundle-key=\"button_filter_all\"></a><a href=\"#\" class=\"btn filter_fr \" data-bundle-key=\"button_filter_fr\"></a><a href=\"#\" class=\"btn filter_en \" data-bundle-key=\"button_filter_en\"></a><a href=\"#\" class=\"btn filter_es \" data-bundle-key=\"button_filter_es\"></a></div></div><!--  courses --><div class=\"accordion \" id=\"accordionCourseSelect_"
							+ itemName + "\">";

					for ( var i = 0; i < listCourses.catalogDescription_collection.length; i++) {
						
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
								+ "\" class=\"accordion-group courseToSort courseToFilter "
								+ listCourses.catalogDescription_collection[i].lang
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
								+ "</a><div class=\"toolsWrapper\"><div class=\"dropdown\" id=\"menu"
								+ "_"
								+ itemCleaned
								+ "_"
								+ i
								+ "\"><a class=\"dropdown-toggle icon-button-right button-microapp\"  rel=\"tooltip\" data-toggle=\"dropdown\" href=\"#menu"
								+ "_"
								+ itemCleaned
								+ "_"
								+ i
								+ "\" data-original-title=\"ajouter à ma sélection\"><i class=\"icon-bookmark\"></i></a><ul class=\"dropdown-menu\"><li><h5 class=\"dropdown-header \" data-bundle-key=\"label_add_selection\"></h5></li></ul></div>";

						div += "<a href=\"#\" onMouseDown=\"return openCouseOutlinePDF(\'" + listCourses.catalogDescription_collection[i].courseId + "\')\" "
								+ "data-original-title=\"Plan de cours\" class=\"button-microapp icon-button-right\"><i class=\"icon-file-pdf\"></i></a>";

						div += "<a class=\"icon-button-right button-microapp\" data-original-title=\" Plan de cours enrichi\" href=\"planCours.html?id=" + listCourses.catalogDescription_collection[i].courseId + "\" target=\"_blank\">"
								+ "<i class=\"icon-star\"></i></a></div></div><div class=\"accordionToolsWrapper3\"><div class=\"accordionTools3 pull-right\">"
								+ "<div class=\"trimesterWrapper\"><span  data-bundle-key=\"label_available_course\"></span><b class=\"trimester \"   rel=\"tooltip\" data-bundle-key=\"label_summer\"></b><b class=\"trimester \"   rel=\"tooltip\" data-bundle-key=\"label_autumn\"></b><b class=\"trimester \"   rel=\"tooltip\" data-bundle-key=\"label_winter\"></b></div></div></div></div><div id=\"collapseCourse"
								+ "_"
								+ itemCleaned
								+ "_"
								+ i
								+ "\"class=\"accordion-body collapse\"><div class=\"accordion-inner\"><h4  data-bundle-key=\"label_description\"></h4>"
								+ "<br>"
								+ listCourses.catalogDescription_collection[i].description
								+ "<br><br>"
								+ "<div class=\"btn-toolbar\"><div class=\"btn-group\"><a class=\"dropdown-toggle \" data-toggle=\"dropdown\" href=\"#\"><span class=\"icon-bookmark\"/> <span data-bundle-key=\"label_select\"/></a><ul class=\"dropdown-menu\"><li><h5 class=\"dropdown-header \" data-bundle-key=\"label_add_selection\"></h5></li></ul></div><a class=\"btn\" href=\"planCours.html?id=" + listCourses.catalogDescription_collection[i].courseId + "\" target=\"_blank\"><i class=\"icon-star\"/>  <span data-bundle-key=\"label_html_course_outline\"/></a>";

						div += "<a class=\"btn\" href=\"#\" onMouseDown=\"return openCouseOutlinePDF(\'" + listCourses.catalogDescription_collection[i].courseId + "\')\">"
								+ "<i class=\"icon-file-pdf\"></i> <span data-bundle-key=\"label_pdf_course_outline\"/></a>";

						div += "</div><table class=\"table\"><thead><tr><th data-bundle-key=\"label_department\"></th><th data-bundle-key=\"label_academic_career\"></th><th data-bundle-key=\"label_credits\"></th><th data-bundle-key=\"label_requirements\"></th><th data-bundle-key=\"label_hours\"></th></tr></thead><tbody><tr><td><a href=\"#\">"
								+ listCourses.catalogDescription_collection[i].career
								+ "</a></td><td><a href=\"#\">"
								+ listCourses.catalogDescription_collection[i].department
								+ "</a></td><td>"
								+ listCourses.catalogDescription_collection[i].credits
								+ "</td><td>"
								+ listCourses.catalogDescription_collection[i].requirements
								+ "</td><td data-bundle-key=\"description_hours\"></td></tr></tbody></table></div></div></div>";
					}
					;

					div += "</div>";

					$(selectorIdListingDiv).append(div);

					$(selectorIdListingDiv).fadeIn('slow');
					bindFilters();
					bindSort(selectorAccordionCourseDiv);
					updateLabelsFromBundle();			
					return false;

				}
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
							+ "</a><div class=\"toolsWrapper\"><div class=\"dropdown\" id=\"menu\"><a class=\"dropdown-toggle icon-button-right button-microapp\"  rel=\"tooltip\" data-toggle=\"dropdown\" href=\"#menu\" data-original-title=\"ajouter à ma sélection\"><i class=\"icon-bookmark\"></i></a><ul class=\"dropdown-menu\"><li><h5 class=\"dropdown-header \" data-bundle-key=\"label_add_selection\"></h5></li></ul></div>";

					div += "<a href=\"#\" onMouseDown=\"return openCouseOutlinePDF(\'" + course.courseId + "\')\" "
							+ "data-original-title=\"Plan de cours\" class=\"button-microapp icon-button-right\"><i class=\"icon-file-pdf\"></i></a>";

					div += "<a class=\"icon-button-right button-microapp\" data-original-title=\" Plan de cours enrichi\" href=\"planCours.html?id=" + course.courseId + "\" target=\"_blank\"><i class=\"icon-star\"></i></a><a class=\"icon-button-right button-microapp\" data-original-title=\"cours archivé\" data-toggle=\"\" href=\"archive.html\"></a></div></div><div class=\"accordionToolsWrapper3\"><div class=\"accordionTools3 pull-right\"><div class=\"trimesterWrapper\"><span  data-bundle-key=\"label_available_course\"></span><b class=\"trimester \"   rel=\"tooltip\" data-bundle-key=\"label_summer\"></b><b class=\"trimester \"   rel=\"tooltip\" data-bundle-key=\"label_autumn\"></b><b class=\"trimester \"   rel=\"tooltip\" data-bundle-key=\"label_winter\"></b></div></div></div></div><div id=\"collapseCourse\" class=\"accordion-body in collapse\"><div class=\"accordion-inner\"><h4 data-bundle-key=\"label_description\"></h4>"
							+"<br>"
							+ course.description
							+"<br><br>"
							+ "<div class=\"btn-toolbar\"><div class=\"btn-group\"><a class=\"dropdown-toggle\" data-toggle=\"dropdown\" href=\"#\"><span class=\"icon-bookmark\"></span> <span data-bundle-key=\"label_select\"/></a><ul class=\"dropdown-menu\"><li><h5 class=\"dropdown-header \" data-bundle-key=\"label_add_selection\"></h5></li></ul></div><a class=\"btn\" href=\"planCours.html?id=" + course.courseId + "\" target=\"_blank\"><i class=\"icon-star\"/> <span data-bundle-key=\"label_html_course_outline\"/></a>"

					div += "<a class=\"btn\" href=\"#\" onMouseDown=\"return openCouseOutlinePDF(\'" + course.courseId + "\')\">"
							+ "<i class=\"icon-file-pdf\"></i> <span data-bundle-key=\"label_pdf_course_outline\"/></a>";

					div += "</div><table class=\"table\"><thead><tr><th data-bundle-key=\"label_department\"></th><th data-bundle-key=\"label_academic_career\"></th><th data-bundle-key=\"label_credits\"></th><th data-bundle-key=\"label_requirements\"></th><th data-bundle-key=\"label_hours\"></th></tr></thead><tbody><tr><td><a href=\"#\">"
							+ course.career
							+ "</a></td><td><a href=\"#\">"
							+ course.department
							+ "</a></td><td>"
							+ course.credits
							+ "</td><td>"
							+ course.requirements
							+ "</td><td data-bundle-key=\"description_hours\"></td></tr></tbody></table></div></div></div>";

					$('#my-tab-content').append(div);
					updateLabelsFromBundle();
					return false;

				}
			});
}

/**
 * Bind the clik event on an item (career/department) to the function that list
 * associated catalog descriptions attributes: -itemName: carrer or department
 * -idDiv: id of the div to bind -item: item associated to the div
 * -selectorIdListingDiv: selector of the div that we will populate with the
 * associated catalog descriptions -serviceGet: service that get the catalog
 * descriptions for a specific deparment/career the departments/carrer
 */
function bindItem(itemName, idDiv, item, selectorIdListingDiv) {
	$(idDiv).click(
			function() {
				expandListCatalogDescriptions(itemName, item, selectorIdListingDiv);
				$('.menuitem').removeClass('selected_menuitem');
				$(this).addClass('selected_menuitem');
			});
}

/**
 * Bind the clik event on search buttons to the corresponding functions
 */
function bindSearch() {
	$('#research_tab_main_button').click(
			function() {
				searchCatalogDescription($('#research_tab_main_input').val());
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
	}
}

/**
 * open the pdf for the course outline of the course associated with this catalog description
 */
function openCouseOutlinePDF(courseId) {
	$.ajax({
		url : '/direct/portalManager/' + courseId + '/public_syllabus_info.json',
		datatype : 'json',
		success : function(syllabus_info) {		
			if (syllabus_info.data["pdf_url"] !== "") {
				window.open(syllabus_info.data["pdf_url"], '_blank');
			}
			else {
				window.alert($('#bundleDiv').data("message_no_pdf"));
			}
			return true;
		},
		error : function(jqXHR, textStatus, errorThrown) {
			window.alert(errorThrown);
		}
	});
}

/**
 * create the search result datatable from the catalog description map passed in parameter 
 */
function displayResultCatalogDescriptionSearch(cdList) {
	$('#searchTable tbody').html("");	
	for ( var i = 0; i < cdList.length; i++) {
		var cdRow = "<tr>";
		cdRow += "<td class=\"col-sigle\">" + cdList[i].courseid + "</td>";
		cdRow += "<td>" + cdList[i].coursetitle + "</td>";
		cdRow += "<td><b class=\"trimester\" rel=\"tooltip\" title=\"disponible à l'été 2012\">É12</b><b class=\"trimester\" rel=\"tooltip\" title=\"disponible à l'été 2012\">A12</b><b class=\"trimester\" rel=\"tooltip\" title=\"disponible à l'été 2012\">H13</b></td>";
		cdRow += "<td>" + cdList[i].career + "</td>";
		cdRow += "<td>" + cdList[i].department + "</td>";
		cdRow += "<td class=\"col-pdf\" style=\"text-align:center\"><a href=\"#\" class=\"button-microapp\" data-original-title=\"\"><i class=\"icon-file-pdf\"></i></a></td>";
		cdRow += "<td class=\"col-save\"><a class=\"dropdown-toggle icon-button-right button-microapp\" data-toggle=\"dropdown\" href=\"#menu2\" data-original-title=\"\"><i class=\"icon-bookmark\"></i></a><li><h5 class=\"dropdown-header\">Ajouter à ma sélection</h5></li></ul></td>";
		cdRow += "<td class=\"col-arch\"><a class=\"dropdown-toggle icon-button-right button-microapp\" href=\"#loginModal\" data-original-title=\"archives\"><i class=\"icon-archive\"></i></a></td>";
		$('#searchTable tbody').append(cdRow);
	}
}

/**
 * return catalog descriptions associated with the "searchString" criteria passed in parameter 
 */
function searchCatalogDescription(searchString) {
	var cdList = new Array();
	var cours1= new Array();
	cours1["courseid"] = "1-612-92";
	cours1["coursetitle"] = "Mathématiques financières";
	cours1["career"] = "Année préparatoire BAA";
	cours1["department"] = "Méthodes quantitatives de gestion" + searchString;
	
	var cours2= new Array();
	cours2["courseid"] = "1-404-96";
	cours2["coursetitle"] = "Sociologie de l'entreprise";
	cours2["career"] = "Année préparatoire BAA";
	cours2["department"] = "Management" + searchString;
	
	var cours3= new Array();
	cours3["courseid"] = "80-020-76";
	cours3["coursetitle"] = "Méthodologie de la recherche";
	cours3["career"] = "Programme de doctorat";
	cours3["department"] = "Doctorat";
	
	cdList[0] = cours1;
	cdList[1] = cours2;
	cdList[2] = cours3;
	
	displayResultCatalogDescriptionSearch(cdList);
}



/**
 * Script that is executed when the page is loaded
 */
$(document)
		.ready(
				function() {

					$('.typeahead').typeahead();
					$('#loginModal').modal('hide');
					$(".collapse").collapse({
						toggle : false
					});
					$("#deploy-billboard").collapse({
						toggle : true
					});
					$("table#sortTableExample").tablesorter({
						sortList : [ [ 1, 0 ] ]
					});
					$('#tabs').tab();
					$('.button-microapp').tooltip('hide');
					$('#myModal').modal('hide');
					$('#modalBAA').modal('hide');
					$('#popit').popover('show');
					$('#popit').popover('hide');
					$('.collapse').collapse('toggle');
					$('.dropdown-toggle').dropdown();
					bindSearch();

					initCourseListing('career',
							'/direct/portalManager/getCareers.json');
					initCourseListing('department',
							'/direct/portalManager/getDepartments.json');
					filterCatalogDescriptions();
					bindChangeLanguage();
					getBundle('FR');
					updateLabelsFromBundle();
				});
