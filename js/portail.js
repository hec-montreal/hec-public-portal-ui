/**
 * Get a catalog description and initialize the editor dialog box attributes:
 * -itemName: carrer or department -serviceList: service that list all the
 * departments/career that should be available for browsing -serviceGet: service
 * that get the catalog descriptions for a specific deparment/career the
 * departments/carrer
 */
function initCourseListing(itemName, serviceList, serviceGet) {

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
								+ "\" href=\"#\" class=\"ui-link-inherit\">"
								+ listItems.portalManager_collection[i].description
								+ "</a></dd>";
						$(selectorIdTabDiv).append(div);
						var idDiv = '#' + id;

						var div = "<div id=\""
								+ idListingDiv
								+ "\" class=\" in \" style=\"display: none; \"><div class=\"btn-group\" style=\"\"><div class=\"dropdown\"><a href=\"#\" class=\"dropdown-toggle btn\" data-toggle=\"dropdown\">Trier <b class=\"caret\"></b></a><ul class=\"dropdown-menu\"><li><a href=\"#dropdown1\" data-toggle=\"tab\">Par ordre alphabétique</a></li><li><a href=\"#dropdown2\" data-toggle=\"tab\">Par numéro de cours</a></li><li><a href=\"#dropdown2\" data-toggle=\"tab\">Par ordre de sigle</a></li></ul></div></div><div class=\"btn-group\"><a href=\"#\" class=\"btn active\">Tous les cours</a><a href=\"#\" class=\"btn\">En français</a><a href=\"#\" class=\"btn\">En anglais</a><a href=\"#\" class=\"btn\">En espagnol</a></div><div class=\"accordion\" id=\"accordionCourseSelect\"></div></div>";
						$(selectorIdMainDiv).html(div);
						bindItem(itemName, idDiv, item, selectorIdListingDiv,
								serviceGet);

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
 * Get the bundle associated with the locale(french/english/espagnol) and reload all attributes with internationalized labels
 * attributes: -locale: the locale selected by the user
 */
function getBundle(locale) {

	$.ajax({
		url : '/direct/portalManager/getBundles/' + locale + '.json',
		datatype : 'json',
		success : function(msgsBundle) {
			$('.bundle-attribute').each(function(index, value){
				var key = $(this).attr('data-bundle-key');
				var text = msgsBundle.data[key];
				$(this).text(text);
		});
		}
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
		$(this).addClass('active');
		$('.sort_title').removeClass('active');

		var listCoursesSorted = $('.accordion-group').sort(function(a, b) {
			return $(a).attr('data-courseId') > $(b).attr('data-courseId') ? 1 : -1;
		});
		$(selectorAccordionCourseDiv).html(listCoursesSorted);
	});

	$('.sort_title').click(function() {
		$(this).addClass('active');
		$('.sort_course_id').removeClass('active');

		var listCoursesSorted = $('.accordion-group').sort(function(a, b) {
			return $(a).attr('data-title') > $(b).attr('data-title') ? 1 : -1;
		});
		$(selectorAccordionCourseDiv).html(listCoursesSorted);
	});
}

/**
 * Bind "language filtering buttons" (french/english/spanish) to the filtering
 * behaviour
 */
function bindFilters() {
	$('.filter_fr').click(function() {
		$('.accordion-group').hide();
		$('.FR').show();
		$('.btn').removeClass('active');
		$('.filter_fr').addClass('active');
	});

	$('.filter_en').click(function() {
		$('.accordion-group').hide();
		$('.AN').show();
		$('.btn').removeClass('active');
		$('.filter_en').addClass('active');
	});

	$('.filter_es').click(function() {
		$('.accordion-group').hide();
		$('.ES').show();
		$('.btn').removeClass('active');
		$('.filter_es').addClass('active');
	});

	$('.filter_all').click(function() {
		$('.accordion-group').show();
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
function expandListCatalogDescriptions(itemName, item, selectorIdListingDiv,
		serviceGet) {

	var itemCleaned = item.replace(/[^a-z0-9\s]/gi, '');
	var selectorAccordionCourseDiv = '#accordionCourseSelect_' + itemName;

	$
			.ajax({
				url : serviceGet + item + '.json',
				datatype : 'json',
				success : function(listCourses) {
					$(selectorIdListingDiv).html("");

					var div = "<div class=\"btn-toolbar well\"><div class=\"btn-group \" style=\"\"><div class=\"dropdown\"><a href=\"#\"  data-toggle=\"dropdown\" class=\"dropdown-toggle btn bundle-attribute\" data-bundle-key=\"button_sort\"><b class=\"caret\"></b></a><ul class=\"dropdown-menu\"><li class=\"sort_title\"><a href=\"#dropdown1\" data-toggle=\"tab\" class=\"bundle-attribute\" data-bundle-key=\"button_sort_alphabetic\"></a></li><li class=\"sort_course_id\"><a href=\"#dropdown2\" data-toggle=\"tab\" class=\"bundle-attribute\" data-bundle-key=\"button_sort_numeric\"></a></li></ul></div></div><div class=\"btn-group\"><a href=\"#\" class=\"btn active filter_all bundle-attribute\" data-bundle-key=\"button_filter_all\"></a><a href=\"#\" class=\"btn filter_fr bundle-attribute\" data-bundle-key=\"button_filter_fr\"></a><a href=\"#\" class=\"btn filter_en bundle-attribute\" data-bundle-key=\"button_filter_en\"></a><a href=\"#\" class=\"btn filter_es bundle-attribute\" data-bundle-key=\"button_filter_es\"></a></div></div><!--  courses --><div class=\"accordion \" id=\"accordionCourseSelect_"
							+ itemName + "\">";

					for ( var i = 0; i < listCourses.catalogDescription_collection.length; i++) {
						div += "<div id=\"\" data-courseId=\""
								+ listCourses.catalogDescription_collection[i].courseId
								+ "\" data-title=\""
								+ listCourses.catalogDescription_collection[i].title
								+ "\" class=\"accordion-group "
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
								+ "\" data-original-title=\"ajouter à ma sélection\"><i class=\"icon-bookmark\"></i></a><ul class=\"dropdown-menu\"><li><h5 class=\"dropdown-header\">Ajouter à ma sélection</h5></li><li><a href=\"#\" class=\"button-option\"><i class=\"icon-ok disabled\" style=\"\"></i> Été 2012</a></li><li><a href=\"#\" class=\"button-option\"><i class=\"icon-ok\" style=\"\"></i> Automne 2012</a></li><li><a href=\"#\" class=\"button-option\"><i class=\"icon-ok\" style=\"\"></i> Hiver 2013</a></li></ul></div>";

						div += "<a href=\"#\" onMouseDown=\"return openCouseOutlinePDF(\'" + listCourses.catalogDescription_collection[i].courseId + "\')\" "
								+ "data-original-title=\"Plan de cours\" class=\"button-microapp icon-button-right\"><i class=\"icon-file-pdf\"></i></a>";

						div += "<a class=\"icon-button-right button-microapp\" data-original-title=\" Plan de cours enrichi\" href=\"#\">"
								+ "<i class=\"icon-star\"></i></a></div></div><div class=\"accordionToolsWrapper3\"><div class=\"accordionTools3 pull-right\">"
								+ "<div class=\"trimesterWrapper\"><span>cours disponible : </span><b class=\"trimester\"   rel=\"tooltip\" title=\"disponible à l'été 2012\">É12</b><b class=\"trimester\"   rel=\"tooltip\" title=\"disponible à l'été 2012\">A12</b><b class=\"trimester\"   rel=\"tooltip\" title=\"disponible à l'été 2012\">H13</b></div></div></div></div><div id=\"collapseCourse"
								+ "_"
								+ itemCleaned
								+ "_"
								+ i
								+ "\"class=\"accordion-body collapse\"><div class=\"accordion-inner\"><h4>Description</h4>"
								+ listCourses.catalogDescription_collection[i].description
								+ "<div class=\"btn-toolbar\"><div class=\"btn-group\"><a class=\"dropdown-toggle\" data-toggle=\"dropdown\" href=\"#\"><span class=\"icon-bookmark\"></span> Sélectionner</a><ul class=\"dropdown-menu\"><li><h5 class=\"dropdown-header\">Ajouter à ma sélection</h5></li><li><a href=\"#\" class=\"button-option\">Été 2012</a></li><li><a href=\"#\" class=\"button-option\">Automne 2012</a></li><li><a href=\"#\" class=\"button-option\">Hiver 2013</a></li></ul></div><a class=\"btn\" href=\"#\"><i class=\"icon-star\"></i> Plan de cours enrichi</a>";

						div += "<a class=\"btn\" href=\"#\" onMouseDown=\"return openCouseOutlinePDF(\'" + listCourses.catalogDescription_collection[i].courseId + "\')\">"
								+ "<i class=\"icon-file-pdf\"></i> Plan de cours</a>";

						div += "</div><table class=\"table\"><thead><tr><th>Responsable:</th><th>Programme d'études:</th><th>Crédit(s):</th><th>Exigences:</th><th>Horaire:</th></tr></thead><tbody><tr><td><a href=\"#\">"
								+ listCourses.catalogDescription_collection[i].career
								+ "</a></td><td><a href=\"#\">"
								+ listCourses.catalogDescription_collection[i].department
								+ "</a></td><td>"
								+ listCourses.catalogDescription_collection[i].credits
								+ "</td><td>"
								+ listCourses.catalogDescription_collection[i].requirements
								+ "</td><td>Outil de recherche d'horaire (via HEC en ligne)</td></tr></tbody></table></div></div></div>";
					}
					;

					div += "</div>";

					$(selectorIdListingDiv).append(div);

					$(selectorIdListingDiv).fadeIn('slow');
					bindFilters();
					bindSort(selectorAccordionCourseDiv);
					bindChangeLanguage();
					getBundle('FR');
					return false;

				}
			});
}

/**
 * Expand the catalog description that match the course id passed in parameter
 */
function expandCatalogDescription(course) {

	$
			.ajax({
				url : '/direct/catalogDescription/' + course + '.json',
				datatype : 'json',
				success : function(course) {

					var div = "<div id=\"\" class=\"accordion-group \"><div class=\"accordion-heading row\"><div class=\"span5\"><a class=\"accordion-toggle\" data-toggle=\"collapse\" href=\"#collapseCourse\"data-parent=\"#accordionCourseSelect\">"
							+ course.courseId
							+ " - "
							+ course.title
							+ "</a><div class=\"toolsWrapper\"><div class=\"dropdown\" id=\"menu\"><a class=\"dropdown-toggle icon-button-right button-microapp\"  rel=\"tooltip\" data-toggle=\"dropdown\" href=\"#menu\" data-original-title=\"ajouter à ma sélection\"><i class=\"icon-bookmark\"></i></a><ul class=\"dropdown-menu\"><li><h5 class=\"dropdown-header\">Ajouter à ma sélection</h5></li><li><a href=\"#\" class=\"button-option\"><i class=\"icon-ok disabled\" style=\"\"></i> Été 2012</a></li><li><a href=\"#\" class=\"button-option\"><i class=\"icon-ok\" style=\"\"></i> Automne 2012</a></li><li><a href=\"#\" class=\"button-option\"><i class=\"icon-ok\" style=\"\"></i> Hiver 2013</a></li></ul></div>";

					div += "<a href=\"#\" onMouseDown=\"return openCouseOutlinePDF(\'" + course.courseId + "\')\" "
							+ "data-original-title=\"Plan de cours\" class=\"button-microapp icon-button-right\"><i class=\"icon-file-pdf\"></i></a>";

					div += "<a class=\"icon-button-right button-microapp\" data-original-title=\" Plan de cours enrichi\" href=\"#\"><i class=\"icon-star\"></i></a><a class=\"icon-button-right button-microapp\" data-original-title=\"cours archivé\" data-toggle=\"\" href=\"archive.html\"></a></div></div><div class=\"accordionToolsWrapper3\"><div class=\"accordionTools3 pull-right\"><div class=\"trimesterWrapper\"><span>cours disponible : </span><b class=\"trimester\"   rel=\"tooltip\" title=\"disponible à l'été 2012\">É12</b><b class=\"trimester\"   rel=\"tooltip\" title=\"disponible à l'été 2012\">A12</b><b class=\"trimester\"   rel=\"tooltip\" title=\"disponible à l'été 2012\">H13</b></div></div></div></div><div id=\"collapseCourse\"class=\"accordion-body in collapse\"><div class=\"accordion-inner\"><h4>Description</h4>"
							+ course.description
							+ "<div class=\"btn-toolbar\"><div class=\"btn-group\"><a class=\"dropdown-toggle\" data-toggle=\"dropdown\" href=\"#\"><span class=\"icon-bookmark\"></span> Sélectionner</a><ul class=\"dropdown-menu\"><li><h5 class=\"dropdown-header\">Ajouter à ma sélection</h5></li><li><a href=\"#\" class=\"button-option\">Été 2012</a></li><li><a href=\"#\" class=\"button-option\">Automne 2012</a></li><li><a href=\"#\" class=\"button-option\">Hiver 2013</a></li></ul></div><a class=\"btn\" href=\"#\"><i class=\"icon-star\"></i> Plan de cours enrichi</a>"

					div += "<a class=\"btn\" href=\"#\" onMouseDown=\"return openCouseOutlinePDF(\'" + course.courseId + "\')\">"
							+ "<i class=\"icon-file-pdf\"></i> Plan de cours</a>";

					div += "</div><table class=\"table\"><thead><tr><th>Responsable:</th><th>Programme d'études:</th><th>Crédit(s):</th><th>Exigences:</th><th>Horaire:</th></tr></thead><tbody><tr><td><a href=\"#\">"
							+ course.career
							+ "</a></td><td><a href=\"#\">"
							+ course.department
							+ "</a></td><td>"
							+ course.credits
							+ "</td><td>"
							+ course.requirements
							+ "</td><td>Outil de recherche d'horaire (via HEC en ligne)</td></tr></tbody></table></div></div></div>";

					$('#my-tab-content').append(div);
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
function bindItem(itemName, idDiv, item, selectorIdListingDiv, serviceGet) {
	$(idDiv).click(
			function() {
				expandListCatalogDescriptions(itemName, item,
						selectorIdListingDiv, serviceGet)
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
	var department = getUrlVars()["department"];
	var career = getUrlVars()["career"];
	var course = getUrlVars()["course"];
	if (typeof (department) !== 'undefined') {
		$('#par-responsable').addClass('active');
		$('#par-programme').removeClass('active');
		$('#tab_responsable').addClass('active');
		$('#tab_programme').removeClass('active');
		expandListCatalogDescriptions(getUrlVars()["department"],
				'#listing_department',
				'/direct/catalogDescription/getCatalogDescriptionsByDepartment/');
	} else if (typeof (career) !== 'undefined') {
		expandListCatalogDescriptions(getUrlVars()["career"],
				'#listing_career',
				'/direct/catalogDescription/getCatalogDescriptionsByCareer/');
	} else if (typeof (course) !== 'undefined') {
		$('#par-programme').removeClass('active');
		$('#tab_programme').removeClass('active');
		expandCatalogDescription(course);
	}
}

/**
 * open the pdf for the course outline of the course associated with this catalog description
 */
function openCouseOutlinePDF(courseId) {
	$.ajax({
				url : '/direct/portalManager/' + courseId + '/specific-course',
				success : function(course) {
					if (course !== "") {
						window.location = '/sdata/c/attachment/' + course + '/OpenSyllabus/' + course + '_public.pdf';
					}
					else {
						window.alert("Il n'y a aucune version publié du Plan de Cours");
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

					initCourseListing('career',
							'/direct/portalManager/getCareers.json',
							'/direct/catalogDescription/getCatalogDescriptionsByCareer/');
					initCourseListing('department',
							'/direct/portalManager/getDepartments.json',
							'/direct/catalogDescription/getCatalogDescriptionsByDepartment/');
					filterCatalogDescriptions();
					bindChangeLanguage();
					getBundle('FR');
				});
