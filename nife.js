var facilities = [
  {"name": "NCI Optical Microscopy Core","pi": "Tatiana Karpova, PhD "},
  {"name": "NCI High-Throughput Imaging Facility","pi": "Gianluca Pegoraro, PhD"},
  {"name": "Optical Microscopy and Image Analysis Lab","pi": "Stephen Lockett, PhD"},
  {"name": "Collaborative Protein Technology Resource","pi": "Noemi Kedei, PhD"},
  {"name": "Molecular and Digital Pathology Laboratory","pi": "Scott M. Lawrence, MS"},
  {"name": "CCR Confocal Microscopy Core ","pi": "Michael Kruhlak, PhD "},
  {"name": "LCPG Microscopy Core Facility","pi": "Ross Lake, PhD"},
  {"name": "CDBL Microscopy Core","pi": "Matthew Anderson, PhD"},
  {"name": "Volume Electron Microscopy Facility","pi": "Narayan Kedar, PhD"}
];

var links = [
  {"name": "NIFE Server Login","link": "#"},
  {"name": "NCI-Wide Imaging Data Catalog","link": "#"},
  {"name": "Image Analysis Resources","link": "#"},
  {"name": "Training and Documentation","link": "#"},
  {"name": "Request Accounts or Support","link": "#"},
  {"name": "External Data Sharing","link": "#"},
  {"name": "How to cite NIFE","link": "#"},
  {"name": "Publications supported by NIFE","link": "#"}
];

$(document).ready(function(){

  let href = $(location).attr('href');
  let filename = href.split("/").pop();
  let url = filename.split("?")[0];

  if (url == "landing.html") {
    add_facilities();
    add_links();
  }
  if (url == "nife.html") {
    let facility = find_facility();
    $("#facility_name").text(facility);
    setup_biosample_table();
    $("#specimen_dialog").dialog({autoOpen: false, modal: true, width: 600, height: 400});
  }
});

function add_facilities() {
  $.each(facilities, function(i, facility){
    var anchor = $("<a>");
    anchor.addClass("facility");
    anchor.attr("href", "nife.html?facility=" + i);
    var p = $("<p class='facility'>");
    p.append("<B>" + facility.name + "</B><BR>" + facility.pi);
    anchor.append(p);
    $("#facilities").append(anchor);
  });
}

function add_links() {
  $.each(links, function(i, link){
    var p = $("<p class='linkbox'>");
    var anchor = $("<a>");
    anchor.text(link.name);
    anchor.attr("href", link.link);
    p.append(anchor);
    $("#links").append(p);
  });
}

function find_facility() {
  let params = (new URL(document.location)).searchParams;
  let index = params.get("facility");

  return facilities[index]["name"];
}

function setup_biosample_table() {
  var table = $("<table class='sample_table' id='biosample_table'>");
  var id_row  = $("<tr id='id_row'>");
  id_row.append("<th class='bio'> Biosample ID </th>");
  id_row.append("<td class='bio' > <input type='text' style='width:200px;'></input> </td>");
  let new_biosample_button = $("<a id='new_biosample_button_0' href='#'>New</a>");
  id_row.append($("<td class='bio'></td>").append(new_biosample_button));
  new_biosample_button.click(function(e){ add_new_biosample_row(e); });
  table.append(id_row);
  var description_row = $("<tr id='description_row'>");
  description_row.append("<th class='bio'> Description </th>");
  description_row.append("<td class='bio'> <TEXTAREA  style='width:200px;'> </TEXTAREA> </td>");
  table.append(description_row);
  var organism_row = $("<tr id='organism_row'>");
  organism_row.append("<th class='bio'> Organism </th>");
  organism_row.append("<td class='bio'> <SELECT style='width:200px;'><OPTION></OPTION><OPTION>Human</OPTION><OPTION>Dog</OPTION><SELECT> </td>");
  table.append(organism_row);
  var biosample_type_row = $("<tr id=biosample_type_row>");
  biosample_type_row.append("<th class='bio'> Biosample Type </th>");
  biosample_type_row.append("<td class='bio'> <SELECT style='width:200px;'><OPTION></OPTION><OPTION>Normal</OPTION><OPTION>Neoplasm</OPTION><SELECT> </td>");
  table.append(biosample_type_row);
  var cell_line_row = $("<tr id='cell_line_row'>");
  cell_line_row.append("<th class='bio'> Cell Line </th>");
  cell_line_row.append("<td class='bio'> <input type='text' style='width:200px;'></input> </td>");
  table.append(cell_line_row);
  var tissue_type_row = $("<tr id='tissue_type_row'>");
  tissue_type_row.append("<th class='bio'> Tissue Type </th>");
  tissue_type_row.append("<td class='bio'> <SELECT style='width:200px;'><OPTION></OPTION><OPTION>Normal</OPTION><OPTION>Neoplasm</OPTION><SELECT>  </td>");
  table.append(tissue_type_row);
  var tissue_subtype_row = $("<tr id='tissue_subtype_row'>");
  tissue_subtype_row.append("<th class='bio'> Tissue Subtype </th>");
  tissue_subtype_row.append("<td class='bio'> <SELECT style='width:200px;'><OPTION></OPTION><OPTION>Normal</OPTION><OPTION>Neoplasm</OPTION><SELECT>  </td>");
  table.append(tissue_subtype_row);
  var intrinsic_variables_row = $("<tr id='intrinsic_variables_row'>");
  intrinsic_variables_row.append("<th class='bio'> Intrinsic Variables </th>");
  intrinsic_variables_row.append("<td class='bio'> <input type='text' style='width:200px;'></input>  </td>");
  table.append(intrinsic_variables_row);
  var extrinsic_variables_row = $("<tr id='extrinsic_variables_row'>");
  extrinsic_variables_row.append("<th class='bio'> Extrinsic Variables </th>");
  extrinsic_variables_row.append("<td class='bio'> <input type='text' style='width:200px;'></input>  </td>");
  table.append(extrinsic_variables_row);
  var experimental_variables_row = $("<tr id='experimental_variables_row'>");
  experimental_variables_row.append("<th class='bio'> Experimental Variables </th>");
  experimental_variables_row.append("<td class='bio'> <input type='text' style='width:200px;'></input>  </td>");
  table.append(experimental_variables_row);

  add_new_specimen_row(table, 0, 0);
  add_new_specimen_row(table, 0, 1);
  add_new_specimen_row(table, 0, 2);
  add_new_specimen_row(table, 0, 3);
  add_new_specimen_row(table, 0, 4);
  add_new_specimen_row(table, 0, 5);
  add_new_specimen_row(table, 0, 6);
  add_new_specimen_row(table, 0, 7);
  add_new_specimen_row(table, 0, 8);
  add_new_specimen_row(table, 0, 9);

  $("#biosample_table_div").append(table);
}
function add_new_specimen_row(table, column, row) {
  var specimen_row = $("<tr id='specimen_row_" + row + "'>");
  specimen_row.append("<th class='bio'> Specimen </th>");
  let specimen_button = $("<a id='new_biosample_button_" + column + "_" + row + "' href='#'>New</a>");
  specimen_row.append($("<td class='bio'></td>").append("Plate: ?  Well: ?&nbsp;&nbsp;&nbsp;&nbsp;").append(specimen_button));
  specimen_button.click(function(e){ add_new_specimen(e); });
  table.append(specimen_row);
}

function add_to_existing_specimen_row(table, column, row) {
  var specimen_row = $("#specimen_row_" + row);
  let specimen_button = $("<a id='new_biosample_button_" + column + "_" + row + "' href='#'>New</a>");
  specimen_row.append($("<td class='bio'></td>").append("Plate: ?  Well: ?&nbsp;&nbsp;&nbsp;&nbsp;").append(specimen_button));
  specimen_button.click(function(e){ add_new_specimen(e); });
}

function add_new_biosample_row(e) {
  let row = e.target.id.split("_")[3];
  row++;
  console.log(row);
  $("#new_biosample_button_0").parent().remove();
  $("#id_row").append("<td class='bio'> <input type='text' style='width:200px;'></input> </td>");
  let new_biosample_button = $("<a id='new_biosample_button_"+row+"' href='#' >New</a>");
  new_biosample_button.click(function(e){
    add_new_biosample_row(e);
    let row = e.target.id.split("_")[3];
   $("#new_biosample_button_"+row).parent().remove();
   row++;
    console.log(row);
  });
  $("#id_row").append($("<td class='bio'></td>").append(new_biosample_button));
  $("#description_row").append("<td class='bio'> <TEXTAREA style='width:200px;'> </TEXTAREA> </td>");
  $("#organism_row").append("<td class='bio'> <SELECT style='width:200px;'><OPTION></OPTION><OPTION>Human</OPTION><OPTION>Dog</OPTION><SELECT> </td>");
  $("#biosample_type_row").append("<td class='bio'> <SELECT style='width:200px;'><OPTION></OPTION><OPTION>Normal</OPTION><OPTION>Neoplasm</OPTION><SELECT> </td>");
  $("#cell_line_row").append("<td class='bio'> <input type='text' style='width:200px;'></input> </td>");
  $("#tissue_type_row").append("<td class='bio'> <SELECT style='width:200px;'><OPTION></OPTION><OPTION>Normal</OPTION><OPTION>Neoplasm</OPTION><SELECT>  </td>");
  $("#tissue_subtype_row").append("<td class='bio'> <SELECT style='width:200px;'><OPTION></OPTION><OPTION>Normal</OPTION><OPTION>Neoplasm</OPTION><SELECT>  </td>");
  $("#intrinsic_variables_row").append("<td class='bio'> <input type='text' style='width:200px;'></input>  </td>");
  $("#extrinsic_variables_row").append("<td class='bio'> <input type='text' style='width:200px;'></input>  </td>");
  $("#experimental_variables_row").append("<td class='bio'> <input type='text' style='width:200px;'></input>  </td>");

  let table = $("#biosample_table");
  add_to_existing_specimen_row(table, row, 0);
  add_to_existing_specimen_row(table, row, 1);
  add_to_existing_specimen_row(table, row, 2);
  add_to_existing_specimen_row(table, row, 3);
  add_to_existing_specimen_row(table, row, 4);
  add_to_existing_specimen_row(table, row, 5);
  add_to_existing_specimen_row(table, row, 6);
  add_to_existing_specimen_row(table, row, 7);
  add_to_existing_specimen_row(table, row, 8);
  add_to_existing_specimen_row(table, row, 9);

/*
  let specimen_button = $("<a id='new_specimen_button' href='#'>New</a>");
  specimen_button.click(function(e){ add_new_specimen(e); });
  $("#specimen_row_0").append($("<td class='bio'></td>").append("bob"));
  $("#specimen_row_1").append($("<td class='bio'></td>").append("bret"));
  $("#specimen_row_2").append($("<td class='bio'></td>").append(specimen_button));
  $("#specimen_row_3").append($("<td class='bio'></td>").append(specimen_button));
  $("#specimen_row_4").append($("<td class='bio'></td>").append(specimen_button));
  $("#specimen_row_5").append($("<td class='bio'></td>").append(specimen_button));
  $("#specimen_row_6").append($("<td class='bio'></td>").append(specimen_button));
  $("#specimen_row_7").append($("<td class='bio'></td>").append(specimen_button));
  $("#specimen_row_8").append($("<td class='bio'></td>").append(specimen_button));
  $("#specimen_row_9").append($("<td class='bio'></td>").append(specimen_button));
*/
}

function add_new_specimen(e) {
  $("#specimen_dialog").empty();
  console.log(e.target.id);

  let table = $("<table id='specimen_table'>");
  table.append("<tr><th class='bio'>Specimen Location</th><td><SELECT><OPTION></OPTION><OPTION>Individual</OPTION><OPTION>Plate ID and Well</OPTION><OPTION>Block ID and Slide ID</OPTION><SELECT> </td></tr>");
  table.append("<tr><th class='bio'>Specimen ID</th><td><input type='text'></input>   </td></tr>");
  table.append("<tr><th class='bio'>Plate ID</th><td><input type='text'></input>   </td><th class='bio'>Well ID</th><td><input type='text'></input>   </td></tr>");
  table.append("<tr><th class='bio'>Block</th><td><input type='text'></input>   </td><th class='bio'>Slide</th><td><input type='text'></input>   </td></tr>");
  table.append("<tr><th class='bio'>Specimen Type</th><td><SELECT><OPTION></OPTION><OPTION>Test</OPTION><OPTION>Control</OPTION><SELECT> </td></tr>");
  table.append("<tr><th class='bio'>Sample Prep Method</th><td><SELECT><OPTION></OPTION><OPTION>Method 1</OPTION><OPTION>Method 2</OPTION><SELECT> </td></tr>");
  table.append("<tr><th class='bio'>Signal Contrast Mechanism</th><td><SELECT><OPTION></OPTION><OPTION>Mech 1</OPTION><OPTION>Mech 2</OPTION><SELECT> </td></tr>");
  table.append("<tr><th class='bio'>Stain</th><td><SELECT><OPTION></OPTION><OPTION>Stain 1</OPTION><OPTION>Stain 2</OPTION><SELECT> </td></tr>");
  table.append("<tr><th class='bio'>Molecular Entity Detected</th><td><input type='text'></input></td></tr>");
  let submit_row = $("<tr>");
  submit_row.append("<th>");
  let cancel_button = $("<BUTTON id='cancel'>Cancel</BUTTON>");
  submit_row.append($("<td>").append(cancel_button));
  submit_row.append("<th>");
  let add_button = $("<BUTTON id='add'>Add Specimen</BUTTON>");
  submit_row.append($("<td>").append(add_button));
  cancel_button.click(function(){$("#specimen_dialog").dialog("close");});
  add_button.click(function(){$("#specimen_dialog").dialog("close");add_new_specimen_button();});
  table.append(submit_row);

  $("#specimen_dialog").append(table);

  $("#specimen_dialog").dialog("open");
}

function add_new_specimen_button() {
  alert("add new specimen button");

}