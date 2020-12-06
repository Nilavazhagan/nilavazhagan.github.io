// JavaScript source code
function main(){
	initTabs();
	showSkills();
	initThemeSelection();
	processProjects();
	modifyResumeLink();
}

function modifyResumeLink(){
	let resumeLink = document.getElementById("resume-link");
	let queryParams = (new URL(document.location)).searchParams;
	let resumeParam = queryParams.get("r");
	let resumeNum = "";
	let allowedResumeNumbers = ["1"];
	if(resumeParam === null || resumeParam === "49"){
		resumeNum = "1";
	}else{
		resumeNum = String.fromCharCode(resumeParam);
		if(allowedResumeNumbers.indexOf(resumeNum) === -1){
			resumeNum = "";
		}
	}
	resumeLink.href = `docs/Resume${resumeNum}.pdf`
}

function showSkills(){
	const skill_container = document.getElementById("skill-content");
	let fragment = new DocumentFragment();
	data.skills.forEach(skill => {
		let li = document.createElement("li");
		li.className = "skill-item";
		let skill_name = document.createElement("div");
		skill_name.className = "skill-name";
		skill_name.textContent = skill.name;
		let skill_bar = document.createElement("div");
		skill_bar.className = "skill-bar";
		window.requestAnimationFrame(() => {
			skill_bar.dataset.value = skill.rating / 5 * 100;
		});
		li.appendChild(skill_name);
		li.appendChild(skill_bar);
		fragment.appendChild(li);
	});
	skill_container.appendChild(fragment);
}

function initThemeSelection(){
	const theme_selectors = Array.from(document.querySelectorAll("input[name='theme-selection']"));
	theme_selectors.forEach(theme_selector => {
		theme_selector.addEventListener("change", event => {
			document.documentElement.dataset.color = event.target.value;
		});
	});
}

function initTabs(){
	const tabs = Array.from(document.querySelectorAll("[data-tab]"));
	const tab_contents = Array.from(document.querySelectorAll("[data-tab-content]"));
	tabs.forEach(tab => {
		tab.addEventListener("change", event => {
			let target = event.target;
			tab_contents.forEach(content => {
				if(content.dataset.tabContent === target.dataset.tab){
					content.classList.remove("hide");
				}else{
					content.classList.add("hide");
				}
			});
		})
	});
}

function processProjects(){
	const projects = data.projects;
	let fragment = new DocumentFragment();
	let tab_fragment = new DocumentFragment();
	let project_content = document.getElementById("project-content");
	projects.forEach((project,index) => {
		let project_div = document.createElement("div");
		project_div.className = "project " + project.orientation + (index !== 0 ? " hide" : "") /*+ (project.pc_game ? " pc" : "")*/;

		if(project.wip){
			project_div.classList.add("wip");
		}

		let project_scrnshots = document.createElement("div");
		project_scrnshots.className = "project-screenshots";

		if(project.image_number > 0){
			let screenshot_tabs = document.createElement("div");
			screenshot_tabs.className = "screenshot-tabs";
			for(let i = 1; i <= project.image_number; i++){
				let image = document.createElement("img");
				image.src = `images/games/${project.folder}/00${i}${project.extension}`;
				image.className = `screenshot${ i !== 1 ? ' hide' : '' }`;
				project_scrnshots.appendChild(image);

				let screenshot_tab = createRadio(i-1, "screenshot-tab", "screenshot-tab-" + index);
				screenshot_tab.addEventListener("change", () => {
					project_scrnshots.querySelector(".screenshot:not(.hide)").classList.add("hide");
					image.classList.remove("hide");
				});
				screenshot_tabs.appendChild(screenshot_tab);
			}
			project_scrnshots.appendChild(screenshot_tabs);
		}else{
			project_scrnshots.classList.add("no-screenshots");
			project_scrnshots.innerHTML =  `<div class="scrnshot-placeholder">
												<i aria-hidden="true" class="fas fa-ban scrnshot-placeholder-icon"></i>
												<div class="scrnshot-placeholder-text"> No Screenshots Yet</div>
											</div>`;
			/*
			
			*/
		}

		let project_title = document.createElement("div");
		project_title.className = "project-title";
		project_title.textContent = project.title;
		let project_desc = document.createElement("div");
		project_desc.className = "project-desc";

		let project_description = document.createElement("div");
		project_description.className = "project-description";
		project_description.textContent = project.description;
		let project_properties = document.createElement("table");
		project_properties.className = "project-properties";

		var property_rows = [];
		project.properties.forEach(property => {
			property_rows.push(`<tr class="project-property">
								<td class="property-label"> ${property.label} </td>
								<td class="hyphen"> - </td>
								<td class="property-value"> ${property.value} </td>
							</tr>`);
		});

		project_properties.innerHTML = property_rows.join("");

		project_desc.appendChild(project_description);
		project_desc.appendChild(project_properties);
		if(project.itchio_link){
			let itchio_anchor = document.createElement("a");
			itchio_anchor.className = "itch-link";
			itchio_anchor.href = project.itchio_link;
			itchio_anchor.target = "_blank";
			itchio_anchor.innerHTML = "Download on <strong>itch.io</strong>";
			project_desc.appendChild(itchio_anchor);
		}

		project_div.appendChild(project_scrnshots);
		project_div.appendChild(project_title);
		project_div.appendChild(project_desc);

		fragment.appendChild(project_div);

		let tab_radio = createRadio(index, "project-tab");
		tab_radio.addEventListener("change", () => {
			project_content.querySelector(".project:not(.hide)").classList.add("hide");
			project_div.classList.remove("hide");
		});
		tab_fragment.appendChild(tab_radio);
	});
	document.getElementById("project-tabs").appendChild(tab_fragment);
	project_content.appendChild(fragment);
}

function createRadio(index, prefix, name){
	let label = document.createElement("label");
	label.className = prefix + "-label";
	let input = document.createElement("input");
	input.type = "radio";
	input.name = name || prefix;
	input.className = prefix;
	input.checked = index === 0;
	input.value = index;
	let span = document.createElement("span");
	span.className = prefix + "-span";

	label.appendChild(input);
	label.appendChild(span);
	return label;
}

window.onload = main;

const data = {
	"skills" : [
		{
			"name" : "C++",
			"rating" : 2.5
		},
		{
			"name" : "Unity",
			"rating" : 2
		},
		{
			"name" : "JavaScript",
			"rating" : 4
		},
		{
			"name" : "jQuery",
			"rating" : 3.5
		},
		{
			"name" : "HTML/CSS",
			"rating" : 3
		},
		{
			"name" : "Mercurial VCS",
			"rating" : 4
		},
		{
			"name" : "OOPs Concepts",
			"rating" : 4
		},
		{
			"name" : "Blender",
			"rating" : 2
		}
	],
	"projects" : [
		{
			"title" : "Mobile VR Simulation with Navigation",
			"description" : "Application that simulates an environment and enables users to explore & navigate to various points of interests.",
			"properties" : [
				{
					"label" : "Genre",
					"value" : "Simulation"
				},
				{
					"label" : "Platform",
					"value" : "Android"
				},
				{
					"label" : "Made With",
					"value" : "Unity 3D, Google Cardboard"
				}
			],
			"orientation" : "landscape",
			"image_number" : 6,
			"folder" : "airport-vr",
			"extension" : ".png"
		},
		/*{
			"title" : "Hatch3",
			"description" : "A Tamagotchi style Match 3 game.",
			"properties" : [
				{
					"label" : "Genre",
					"value" : "Puzzle"
				},
				{
					"label" : "Platform",
					"value" : "Android, iOS"
				},
				{
					"label" : "Made With",
					"value" : "Unity 3D"
				}
			],
			"orientation" : "portrait",
			"image_number" : 0,
			"wip" : true
		},*/
		{
			"title" : "The Infinite Spirit Of Carte Blanche",
			"description" : "The advent of Aliens of innominate origin causes pandemonium on Earth. The Human Race is wiped out by the aliens with the help of their Advanced Robots. Hubert Lysias is the Chosen One to save the Earth. Who is Hubert Lysias? Find Out in the game and help Hubert Lysias to defeat the aliens and save the Earth.",
			"itchio_link" : "https://antreek-games.itch.io/the-infinite-spirit-of-carte-blanche",
			"properties" : [
				{
					"label" : "Genre",
					"value" : "FPS"
				},
				{
					"label" : "Platform",
					"value" : "Windows, macOS, Linux"
				},
				{
					"label" : "Made With",
					"value" : "Unity 3D, Audacity"
				}
			],
			"orientation" : "landscape",
			"folder" : "iscb",
			"image_number" : 5,
			"extension" : ".png",
			"pc_game" : true
		},
		{
			"title" : "Pop It - Colors",
			"description" : "Pop the Dots that appear on the screen to score points. Don't miss a dot. Includes 7 game modes and in-game help.",
			"itchio_link" : "https://antreek-games.itch.io/pop-it-colors",
			"properties" : [
				{
					"label" : "Genre",
					"value" : "Casual"
				},
				{
					"label" : "Platform",
					"value" : "Android"
				},
				{
					"label" : "Made With",
					"value" : "Unity 3D, GIMP, Audacity"
				}
			],
			"orientation" : "portrait",
			"folder" : "pop-it-colors",
			"image_number" : 5,
			"extension" : ".jpg"
		},
		{
			"title" : "Luck! Really?",
			"description" : "Experience Chance based games that are not really based on chance. Can you determine the exact outcome of the CPU in every turn? It is possible! Play for High Scores in the Endless Fun!",
			"itchio_link" : "https://antreek-games.itch.io/luck-really",
			"properties" : [
				{
					"label" : "Genre",
					"value" : "Casual"
				},
				{
					"label" : "Platform",
					"value" : "Android"
				},
				{
					"label" : "Made With",
					"value" : "Unity 3D, Audacity"
				}
			],
			"orientation" : "landscape",
			"folder" : "luck-really",
			"image_number" : 8,
			"extension" : ".jpg"
		},
		{
			"title" : "Pop it",
			"description" : "Pop the Dots that appear on the screen to score points. Don't miss a dot.",
			"itchio_link" : "https://antreek-games.itch.io/pop-it",
			"properties" : [
				{
					"label" : "Genre",
					"value" : "Casual"
				},
				{
					"label" : "Platform",
					"value" : "Android"
				},
				{
					"label" : "Made With",
					"value" : "Unity 3D, Blender, Audacity"
				}
			],
			"orientation" : "portrait",
			"folder" : "pop-it",
			"image_number" : 4,
			"extension" : ".png"
		},
		{
			"title" : "Dead End",
			"description" : "You are caught in a weird dream, a hallucination (Or is it just real??). A dream where you need to solve a maze to escape. You later find out it's not just one maze. Walk between the Walls of Red and on top of the Floor of Black to acquire the Sphere of Green Light in each maze in order to advance.",
			"itchio_link" : "https://antreek-games.itch.io/dead-end",
			"properties" : [
				{
					"label" : "Genre",
					"value" : "Puzzle"
				},
				{
					"label" : "Platform",
					"value" : "Android"
				},
				{
					"label" : "Made With",
					"value" : "Unity 3D"
				}
			],
			"orientation" : "landscape",
			"folder" : "dead-end",
			"image_number" : 4,
			"extension" : ".png"
		}
	]
};