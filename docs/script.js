function showform(formId){
    document.querySelectorAll(".wrapper").forEach(form => form.classList.remove("active"));
    document.getElementById(formId).classList.add("active");
}