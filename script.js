// ================= FINDINGS DATA =================

const findings = [

    {
        title: "S3 Bucket Publicly Accessible",
        account: "Production",
        service: "S3",
        resource: "customer-data-bucket",
        severity: "Critical",
        risk: 98,
        description: "A storage bucket containing customer data is publicly accessible.",
        impact: "Sensitive customer information could be accessed by unauthorized users through public exposure.",
        fix: "Enable S3 Block Public Access, remove public bucket policies, and review bucket permissions.",
        owner: ""
    },

    {
        title: "Security Group Open to Internet",
        account: "Production",
        service: "EC2",
        resource: "sg-web-prod",
        severity: "Critical",
        risk: 95,
        description: "SSH port 22 is accessible from 0.0.0.0/0.",
        impact: "The server is exposed to brute-force attacks and unauthorized access attempts from the internet.",
        fix: "Restrict SSH access to trusted IP addresses or use a bastion host or AWS Systems Manager.",
        owner: ""
    },

    {
        title: "RDS Database Publicly Accessible",
        account: "Production",
        service: "RDS",
        resource: "customer-db",
        severity: "High",
        risk: 90,
        description: "The database instance allows public network access.",
        impact: "A publicly accessible database increases the risk of unauthorized access and data exposure.",
        fix: "Disable public accessibility and restrict database access using private subnets and security groups.",
        owner: ""
    },

    {
        title: "IAM Role Has Excessive Permissions",
        account: "Staging",
        service: "IAM",
        resource: "deployment-role",
        severity: "High",
        risk: 78,
        description: "The IAM role has broad administrative permissions.",
        impact: "Compromised credentials could allow an attacker to perform actions beyond what is required.",
        fix: "Apply least privilege and remove unused or overly broad permissions.",
        owner: ""
    },

    {
        title: "S3 Bucket Encryption Disabled",
        account: "Development",
        service: "S3",
        resource: "dev-logs-bucket",
        severity: "Medium",
        risk: 55,
        description: "Server-side encryption is not enabled for this storage bucket.",
        impact: "Stored data may be exposed if unauthorized access to storage occurs.",
        fix: "Enable default server-side encryption using AWS-managed or customer-managed keys.",
        owner: ""
    },

    {
        title: "Security Group Allows Wide Access",
        account: "Sandbox",
        service: "EC2",
        resource: "sg-test-app",
        severity: "Medium",
        risk: 42,
        description: "The security group allows unnecessary inbound network traffic.",
        impact: "The test environment has a larger attack surface than required.",
        fix: "Review inbound rules and allow only required ports and trusted sources.",
        owner: ""
    }

];


// ================= ELEMENTS =================

const overviewNav = document.getElementById("overviewNav");
const findingsNav = document.getElementById("findingsNav");

const overviewPage = document.getElementById("overviewPage");
const findingsPage = document.getElementById("findingsPage");

const pageTitle = document.getElementById("pageTitle");

const reviewBtn = document.getElementById("reviewBtn");

const findingsList = document.getElementById("findingsList");

const accountFilter = document.getElementById("accountFilter");
const severityFilter = document.getElementById("severityFilter");
const serviceFilter = document.getElementById("serviceFilter");

const clearFilters = document.getElementById("clearFilters");

const findingCount = document.getElementById("findingCount");

const findingModal = document.getElementById("findingModal");
const closeModal = document.getElementById("closeModal");

const resolveBtn = document.getElementById("resolveBtn");

const assignOwnerBtn =
    document.getElementById("assignOwnerBtn");

const ownerModal =
    document.getElementById("ownerModal");

const closeOwnerModal =
    document.getElementById("closeOwnerModal");

const ownerSelect =
    document.getElementById("ownerSelect");

const saveOwnerBtn =
    document.getElementById("saveOwnerBtn");


// ================= CURRENT FINDING =================

let currentFinding = null;


// ================= PAGE NAVIGATION =================

function showOverview() {

    overviewPage.classList.add("active-page");

    findingsPage.classList.remove("active-page");

    overviewNav.classList.add("active");

    findingsNav.classList.remove("active");

    pageTitle.textContent = "Overview";

}


function showFindings() {

    overviewPage.classList.remove("active-page");

    findingsPage.classList.add("active-page");

    overviewNav.classList.remove("active");

    findingsNav.classList.add("active");

    pageTitle.textContent = "Misconfigurations";

    renderFindings();

}


// ================= NAVIGATION =================

overviewNav.addEventListener("click", function (event) {

    event.preventDefault();

    showOverview();

});


findingsNav.addEventListener("click", function (event) {

    event.preventDefault();

    showFindings();

});


reviewBtn.addEventListener("click", function () {

    showFindings();

});


// ================= RENDER FINDINGS =================

function renderFindings() {

    const selectedAccount =
        accountFilter.value;

    const selectedSeverity =
        severityFilter.value;

    const selectedService =
        serviceFilter.value;


    const filteredFindings =
        findings.filter(function (finding) {

            const accountMatch =
                selectedAccount === "All" ||
                finding.account === selectedAccount;


            const severityMatch =
                selectedSeverity === "All" ||
                finding.severity === selectedSeverity;


            const serviceMatch =
                selectedService === "All" ||
                finding.service === selectedService;


            return accountMatch &&
                severityMatch &&
                serviceMatch;

        });


    findingsList.innerHTML = "";

    findingCount.textContent =
        filteredFindings.length;


    filteredFindings.forEach(function (finding) {

        const card =
            document.createElement("div");


        card.className =
            "finding-card";


        card.innerHTML = `

            <div>

                <h3>${finding.title}</h3>

                <div class="finding-meta">

                    <span>${finding.account}</span>

                    <span>${finding.service}</span>

                    <span>${finding.resource}</span>

                </div>

            </div>


            <span class="severity ${finding.severity.toLowerCase()}">

                ${finding.severity}

            </span>

        `;


        card.addEventListener(
            "click",
            function () {

                openFindingModal(finding);

            }
        );


        findingsList.appendChild(card);

    });

}


// ================= FILTERS =================

accountFilter.addEventListener(
    "change",
    renderFindings
);


severityFilter.addEventListener(
    "change",
    renderFindings
);


serviceFilter.addEventListener(
    "change",
    renderFindings
);


// ================= CLEAR FILTERS =================

clearFilters.addEventListener(
    "click",
    function () {

        accountFilter.value = "All";

        severityFilter.value = "All";

        serviceFilter.value = "All";

        renderFindings();

    }
);


// ================= OPEN FINDING MODAL =================

function openFindingModal(finding) {

    currentFinding = finding;


    const modalSeverity =
        document.getElementById(
            "modalSeverity"
        );


    const modalTitle =
        document.getElementById(
            "modalTitle"
        );


    const modalDescription =
        document.getElementById(
            "modalDescription"
        );


    const modalAccount =
        document.getElementById(
            "modalAccount"
        );


    const modalService =
        document.getElementById(
            "modalService"
        );


    const modalResource =
        document.getElementById(
            "modalResource"
        );


    const modalRisk =
        document.getElementById(
            "modalRisk"
        );


    const modalImpact =
        document.getElementById(
            "modalImpact"
        );


    const modalFix =
        document.getElementById(
            "modalFix"
        );


    modalSeverity.textContent =
        finding.severity;


    modalSeverity.className =
        "severity " +
        finding.severity.toLowerCase();


    modalTitle.textContent =
        finding.title;


    modalDescription.textContent =
        finding.description;


    modalAccount.textContent =
        finding.account;


    modalService.textContent =
        finding.service;


    modalResource.textContent =
        finding.resource;


    modalRisk.textContent =
        finding.risk + "/100";


    modalImpact.textContent =
        finding.impact;


    modalFix.textContent =
        finding.fix;


    findingModal.classList.add("show");

}


// ================= CLOSE FINDING MODAL =================

closeModal.addEventListener(
    "click",
    function () {

        findingModal.classList.remove("show");

        currentFinding = null;

    }
);


findingModal.addEventListener(
    "click",
    function (event) {

        if (event.target === findingModal) {

            findingModal.classList.remove("show");

            currentFinding = null;

        }

    }
);


// ================= MARK AS RESOLVED =================

resolveBtn.addEventListener(
    "click",
    function () {

        if (!currentFinding) {

            return;

        }


        const findingIndex =
            findings.indexOf(
                currentFinding
            );


        if (findingIndex !== -1) {

            findings.splice(
                findingIndex,
                1
            );

        }


        findingModal.classList.remove("show");

        currentFinding = null;

        renderFindings();

    }
);


// ================= ASSIGN OWNER =================

assignOwnerBtn.addEventListener(
    "click",
    function () {

        if (!currentFinding) {

            return;

        }


        ownerSelect.value =
            currentFinding.owner || "";


        ownerModal.classList.add("show");

    }
);


// ================= SAVE OWNER =================

saveOwnerBtn.addEventListener(
    "click",
    function () {

        const selectedOwner =
            ownerSelect.value;


        if (selectedOwner === "") {

            alert(
                "Please select an owner."
            );

            return;

        }


        if (currentFinding) {

            currentFinding.owner =
                selectedOwner;

        }


        ownerModal.classList.remove("show");


        alert(
            selectedOwner +
            " has been assigned to this finding."
        );

    }
);


// ================= CLOSE OWNER MODAL =================

closeOwnerModal.addEventListener(
    "click",
    function () {

        ownerModal.classList.remove("show");

    }
);


ownerModal.addEventListener(
    "click",
    function (event) {

        if (event.target === ownerModal) {

            ownerModal.classList.remove("show");

        }

    }
);


// ================= INITIAL RENDER =================

renderFindings();