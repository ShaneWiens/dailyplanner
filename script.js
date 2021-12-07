console.log("look, I can still link a file!")

var currentDay = $("#currentDay");

var savedTasks = localStorage.getItem("dailyTasks");

var dailyTasks;

if (!savedTasks) {
    dailyTasks = {};
} else {
    dailyTasks = JSON.parse(savedTasks);
}

currentDay.text(moment().format('MMMM Do, YYYY'));

fillTimes();


function generateHourCards(rowIndex, currentHour) {

    var row = $("<div></div>");

    row.addClass("row");

    if (rowIndex === currentHour) {
        row.addClass("present");
    } else if (rowIndex > currentHour) {
        row.addClass("future");
    } else {
        row.addClass("past");
    }

    var form = $("<textarea></textarea");

    form.addClass("col-9");

    form.text(dailyTasks[rowIndex]);

    var time = $("<div></div>");

    time.addClass("hour col-2");


    var buttonContainer = $("<div></div>");

    buttonContainer.addClass("saveBtn col-1");

    var saveIcon = $("<i></i>");

    buttonContainer.append(saveIcon);
    saveIcon.addClass("fas fa-save");
    saveIcon.attr("id", rowIndex);


    var timeBlock = $("#hourcard");

    timeBlock.append(row);
    row.append(buttonContainer);
    row.append(form);
    row.append(time);

    time.text(`${rowIndex}:00`);


    saveIcon.on("click", saveTask);
}

function fillTimes() {


    var currentHour = parseInt(moment().format('H'));

    for (let index = 9; index <= 17; index++) {
        generateHourCards(index, currentHour);
    }

}

function saveTask(event) {
    console.log("Saved!");

    var clickedButton = $(event.target);
    var hour = clickedButton.attr("id");
    var textValue = clickedButton.parent().siblings("textarea").val();
    dailyTasks[hour] = textValue;
    localStorage.setItem("dailyTasks", JSON.stringify(dailyTasks));
}