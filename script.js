const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
});
function toggleFAQ(id, iconId) {

    const reponse = document.getElementById(id);
    const icone = document.getElementById(iconId);

    reponse.classList.toggle("hidden");

    if (reponse.classList.contains("hidden")) {
        icone.textContent = "+";
    } else {
        icone.textContent = "−";
    }
}
const contenus = [
    "🎨 Chaque tableau personnalisé est une œuvre unique, créée avec amour pour toi.",
    "📖 Nos magazines mettent en valeur ta beauté et ton histoire personnelle.",
    "✂️ La création, c'est transformer une simple idée en quelque chose de magnifique.",
    "💖 Chez DIAMA'S Creation, chaque commande est traitée avec soin et passion.",
    "🌸 Un tableau personnalisé : le cadeau parfait qui touche le cœur.",
    "📸 Immortalise tes souvenirs dans un magazine rien qu'à toi.",
    "🎁 Offrir une création personnalisée, c'est offrir un morceau de son âme.",
    "✨ La beauté est dans les détails — et nous soignons chaque détail pour toi.",
    "💼 Professionnel, créatif, personnel : voilà les valeurs de DIAMA'S Creation.",
    "🖌️ De l'idée au produit fini, nous accompagnons chaque étape de ta création.",
    "🌟 Ton histoire mérite d'être racontée — laisse-nous la mettre en lumière.",
    "📬 Contacte-nous et transforme ton idée en chef-d'œuvre personnalisé !",
];

const resultBox = document.getElementById('result-box');
const resultText = document.getElementById('result-text');
const btnDecouvrir = document.getElementById('btn-decouvrir');
const btnCopier = document.getElementById('btn-copier');
const copyMsg = document.getElementById('copy-msg');

let contenuActuel = '';

btnDecouvrir.addEventListener('click', () => {
    resultBox.style.opacity = '0';
    setTimeout(() => {
        const index = Math.floor(Math.random() * contenus.length);
        contenuActuel = contenus[index];
        resultText.innerText = contenuActuel;
        resultBox.style.opacity = '1';
        btnCopier.disabled = false;
    }, 300);
});

btnCopier.addEventListener('click', () => {
    if (!contenuActuel) return;
    navigator.clipboard.writeText(contenuActuel).then(() => {
        copyMsg.style.opacity = '1';
        setTimeout(() => { copyMsg.style.opacity = '0'; }, 2500);
    });
});// Galerie - Filtre
function filtrer(categorie) {
    const items = document.querySelectorAll('.galerie-item');
    const btns = document.querySelectorAll('.filtre-btn');

    // Mettre à jour les boutons
    btns.forEach(btn => {
        if (btn.dataset.categorie === categorie) {
            btn.classList.add('bg-pink-600', 'text-white');
            btn.classList.remove('bg-pink-100', 'text-pink-700');
        } else {
            btn.classList.remove('bg-pink-600', 'text-white');
            btn.classList.add('bg-pink-100', 'text-pink-700');
        }
    });

    // Afficher / cacher les items
    items.forEach(item => {
        if (categorie === 'tous' || item.dataset.categorie === categorie) {
            item.classList.remove('hidden');
        } else {
            item.classList.add('hidden');
        }
    });
}

// Galerie - Modale (bonus)
function ouvrirModal(el) {
    document.getElementById('modal-titre').innerText = el.dataset.titre;
    document.getElementById('modal-desc').innerText = el.dataset.desc;
    document.getElementById('modal-emoji').innerText =
        el.querySelector('img').alt;
    document.getElementById('modal').classList.remove('hidden');
}

function fermerModal() {
    document.getElementById('modal').classList.add('hidden');
}

// Fermer modale en cliquant dehors
document.getElementById('modal').addEventListener('click', function(e) {
    if (e.target === this) fermerModal();
});
const bouton = document.getElementById("calculer");

bouton.addEventListener("click", function () {

    const prix = parseFloat(document.getElementById("type").value);
    const quantite = parseInt(document.getElementById("quantite").value);

    const resultat = document.getElementById("resultat");

    if (isNaN(quantite) || quantite <= 0) {

        resultat.innerHTML = "Veuillez entrer une quantité valide.";

        resultat.className =
        "mt-6 text-center text-xl font-bold text-red-600";

        return;
    }

    const total = prix * quantite;

    resultat.innerHTML =
    "Le montant total de votre commande est de " + total.toLocaleString("fr-FR") + " FCFA";

    resultat.className =
    "mt-6 text-center text-xl font-bold text-green-600";

});

const input = document.getElementById("commande");
const boutonAjouter = document.getElementById("ajouter");
const liste = document.getElementById("liste");
const compteur = document.getElementById("compteur");

let commandes = JSON.parse(localStorage.getItem("commandes")) || [];

afficherCommandes();

boutonAjouter.addEventListener("click", ajouterCommande);

function ajouterCommande() {

    const texte = input.value;

    if (texte === "") {
        alert("Veuillez saisir une commande.");
        return;
    }

    commandes.push({
        texte: texte,
        termine: false
    });

    sauvegarder();

    input.value = "";

    afficherCommandes();

}

function afficherCommandes() {

    liste.innerHTML = "";

    commandes.forEach((commande, index) => {

        const li = document.createElement("li");

        li.className =
            "flex justify-between items-center bg-pink-100 p-4 rounded-lg";

        const span = document.createElement("span");

        span.textContent = commande.texte;

        if (commande.termine) {
            span.classList.add("line-through", "text-gray-500");
        }

        span.addEventListener("click", () => {

            commandes[index].termine = !commandes[index].termine;

            sauvegarder();

            afficherCommandes();

        });

        const supprimer = document.createElement("button");

        supprimer.textContent = "Supprimer";

        supprimer.className =
            "bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded";

        supprimer.addEventListener("click", () => {

            commandes.splice(index, 1);

            sauvegarder();

            afficherCommandes();

        });

        li.appendChild(span);

        li.appendChild(supprimer);

        liste.appendChild(li);

    });

    compteur.textContent = commandes.filter(c => !c.termine).length;

}

function sauvegarder() {

    localStorage.setItem("commandes", JSON.stringify(commandes));

}
const form = document.getElementById("contactForm");

form.addEventListener("submit", function (e) {

    e.preventDefault();

    let valide = true;

    document.getElementById("erreurNom").textContent = "";
    document.getElementById("erreurEmail").textContent = "";
    document.getElementById("erreurMessage").textContent = "";
    document.getElementById("confirmation").textContent = "";

    const nom = document.getElementById("nom").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (nom === "") {
        document.getElementById("erreurNom").textContent =
            "Veuillez entrer votre nom.";
        valide = false;
    }

    if (email === "") {

        document.getElementById("erreurEmail").textContent =
            "Veuillez entrer votre email.";

        valide = false;

    } else if (!email.includes("@")) {

        document.getElementById("erreurEmail").textContent =
            "Adresse email invalide.";

        valide = false;
    }

    if (message.length < 20) {

        document.getElementById("erreurMessage").textContent =
            "Le message doit contenir au moins 20 caractères.";

        valide = false;
    }

    if (valide) {

        document.getElementById("confirmation").textContent =
            "✅ Votre message a été envoyé avec succès !";

        document.getElementById("confirmation").className =
            "text-green-600 text-center font-bold mt-4";

        form.reset();
    }

});
// ================= MINI QUIZ =================

const quiz = [

{
question: "Quel produit est proposé par DIAMA'S Creation ?",
reponses: [
"Ordinateur portable",
"Magazine personnalisé",
"Télévision",
"Montre connectée"
],
correct: 1
},

{
question: "Quel est le meilleur cadeau pour un anniversaire ?",
reponses: [
"Bouteille d'eau",
"Clavier",
"Chargeur",
"Magazine personnalisée"
],
correct: 3
},

{
question: "Quel est l'objectif de DIAMA'S Creation ?",
reponses: [
"Créer des souvenirs personnalisés",
"Réparer des téléphones",
"Vendre des ordinateurs",
"Installer Windows"
],
correct: 0
},

{
question: "Avant une commande, il est conseillé de :",
reponses: [
"Commander au hasard",
"Discuter de son projet",
"Ne rien préparer",
"Attendre plusieurs mois"
],
correct: 1
},

{
question: "Les créations DIAMA'S Creation sont :",
reponses: [
"Fabriquées en série",
"Des logiciels",
"Personnalisées",
"Des jeux vidéo"
],
correct: 2
}

];

let indexQuestion = 0;
let score = 0;
let temps = 15;
let interval;

const question = document.getElementById("question");
const reponses = document.getElementById("reponses");
const suivant = document.getElementById("suivant");
const recommencer = document.getElementById("recommencer");
const resultatQuiz = document.getElementById("resultatQuiz");
const timer = document.getElementById("timer");
const progress = document.getElementById("progress");

function afficherQuestion() {

clearInterval(interval);

temps = 15;

timer.textContent = temps;

progress.style.width = "100%";

interval = setInterval(() => {

temps--;

timer.textContent = temps;

progress.style.width = (temps / 15) * 100 + "%";

if (temps <= 0) {

clearInterval(interval);

indexQuestion++;

if(indexQuestion < quiz.length){

afficherQuestion();

}else{

finQuiz();

}

}

},1000);

question.textContent = quiz[indexQuestion].question;

reponses.innerHTML = "";

quiz[indexQuestion].reponses.forEach((rep,i)=>{

const bouton=document.createElement("button");

bouton.textContent=rep;

bouton.className="block w-full text-left bg-pink-100 hover:bg-pink-200 rounded-lg p-4";

bouton.onclick=()=>{

if(i===quiz[indexQuestion].correct){

score++;

}

suivant.disabled=false;

document.querySelectorAll("#reponses button").forEach(btn=>{

btn.disabled=true;

});

};

reponses.appendChild(bouton);

});

suivant.disabled=true;

}

suivant.addEventListener("click",()=>{

indexQuestion++;

if(indexQuestion<quiz.length){

afficherQuestion();

}else{

finQuiz();

}

});

function finQuiz(){

clearInterval(interval);

question.textContent="Quiz terminé 🎉";

reponses.innerHTML="";

suivant.classList.add("hidden");

recommencer.classList.remove("hidden");

if(score<=2){

resultatQuiz.innerHTML="😊 Vous avez obtenu <b>"+score+"/5</b><br>Découvrez davantage DIAMA'S Creation.";

}else if(score<=4){

resultatQuiz.innerHTML="👏 Bravo ! Vous avez obtenu <b>"+score+"/5</b>.";

}else{

resultatQuiz.innerHTML="🏆 Excellent ! Score parfait : <b>5/5</b>.";

}

}

recommencer.addEventListener("click",()=>{

indexQuestion=0;

score=0;

resultatQuiz.innerHTML="";

suivant.classList.remove("hidden");

recommencer.classList.add("hidden");

afficherQuestion();

});

afficherQuestion();