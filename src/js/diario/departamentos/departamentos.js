const servidor = "http://localhost:8080/app";

function consultaDepartamentos() {
	const xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
			const parser = new DOMParser();
			const doc = parser.parseFromString(xhr.response, "application/xml");
		}
	};
	xhr.open("POST", servidor  + "/diario/departamentos/consulta", true);
	xhr.send();
}

consultaDepartamentos();
