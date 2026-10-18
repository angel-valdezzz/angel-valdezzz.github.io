// Content reflects Angel's stated experience. Planned practice is identified separately.
export const technologyGroups = [
  {
    "id": "languages",
    "label": {
      "en": "Languages & queries",
      "es": "Lenguajes y consultas"
    },
    "items": [
      "python",
      "java",
      "javascript",
      "typescript",
      "sql"
    ]
  },
  {
    "id": "testing",
    "label": {
      "en": "Automation & testing",
      "es": "Automatización y pruebas"
    },
    "items": [
      "robot-framework",
      "selenium",
      "playwright",
      "cypress",
      "postman"
    ]
  },
  {
    "id": "development",
    "label": {
      "en": "Development & execution",
      "es": "Desarrollo y ejecución"
    },
    "items": [
      "git",
      "github",
      "github-actions",
      "docker"
    ]
  },
  {
    "id": "collaboration",
    "label": {
      "en": "Management & documentation",
      "es": "Gestión y documentación"
    },
    "items": [
      "jira",
      "xray",
      "confluence"
    ]
  }
];

export const technologies = [
  {
    "id": "python",
    "name": "Python",
    "file": "python.svg",
    "description": {
      "en": "I build testing tools, reusable automation components, data utilities and reports.",
      "es": "Desarrollo herramientas para testing, componentes reutilizables de automatización, utilidades de datos y reportes."
    },
    "uses": {
      "en": [
        "Testing tools and reusable components",
        "Data processing and evidence generation"
      ],
      "es": [
        "Herramientas y componentes reutilizables",
        "Procesamiento de datos y generación de evidencias"
      ]
    },
    "projects": [
      "paylo",
      "pytabify",
      "testscript"
    ]
  },
  {
    "id": "java",
    "name": "Java",
    "file": "java.svg",
    "description": {
      "en": "Knowledge of the language and object-oriented programming, as part of my technical foundation.",
      "es": "Conocimientos del lenguaje y de programación orientada a objetos como parte de mi base técnica."
    },
    "uses": {
      "en": [
        "Language fundamentals",
        "Object-oriented programming"
      ],
      "es": [
        "Fundamentos del lenguaje",
        "Programación orientada a objetos"
      ]
    },
    "projects": []
  },
  {
    "id": "javascript",
    "name": "JavaScript",
    "file": "javascript.svg",
    "description": {
      "en": "Knowledge of the language applied to learning web test automation.",
      "es": "Conocimientos del lenguaje que aplico al aprendizaje de la automatización web."
    },
    "uses": {
      "en": [
        "Web test automation",
        "Selenium and Playwright practice"
      ],
      "es": [
        "Automatización de pruebas web",
        "Práctica con Selenium y Playwright"
      ]
    },
    "projects": [],
    "note": {
      "en": "Planned practice: web testing examples with Selenium and Playwright. These projects will be linked here once available.",
      "es": "Prácticas previstas: ejemplos de pruebas web con Selenium y Playwright. Los proyectos se enlazarán aquí cuando estén disponibles."
    }
  },
  {
    "id": "typescript",
    "name": "TypeScript",
    "file": "typescript.svg",
    "description": {
      "en": "TypeScript is part of my next web test automation practice projects.",
      "es": "TypeScript forma parte de mis próximas prácticas de automatización de pruebas web."
    },
    "uses": {
      "en": [
        "Typed test code",
        "Selenium and Playwright practice"
      ],
      "es": [
        "Código de pruebas tipado",
        "Práctica con Selenium y Playwright"
      ]
    },
    "projects": [],
    "note": {
      "en": "Planned practice: web testing examples with Selenium and Playwright. These projects will be linked here once available.",
      "es": "Prácticas previstas: ejemplos de pruebas web con Selenium y Playwright. Los proyectos se enlazarán aquí cuando estén disponibles."
    }
  },
  {
    "id": "sql",
    "name": "SQL",
    "file": "sql.svg",
    "description": {
      "en": "Basic knowledge from my degree. I can write SQL statements, although I have not used it regularly since then.",
      "es": "Conocimientos básicos adquiridos durante la carrera. Sé escribir sentencias SQL, aunque no lo he utilizado habitualmente desde entonces."
    },
    "uses": {
      "en": [
        "Basic queries",
        "Writing SQL statements"
      ],
      "es": [
        "Consultas básicas",
        "Escritura de sentencias SQL"
      ]
    },
    "projects": []
  },
  {
    "id": "robot-framework",
    "name": "Robot Framework",
    "file": "robot-framework.svg",
    "description": {
      "en": "I automate web and API tests using reusable keywords, separate layers and data-driven cases.",
      "es": "Automatizo pruebas web y de APIs con keywords reutilizables, separación por capas y casos basados en datos."
    },
    "uses": {
      "en": [
        "Keyword-driven and data-driven testing",
        "Reusable automation layers"
      ],
      "es": [
        "Pruebas basadas en keywords y datos",
        "Capas de automatización reutilizables"
      ]
    },
    "projects": [
      "web",
      "api"
    ],
    "mono": true
  },
  {
    "id": "selenium",
    "name": "Selenium",
    "file": "selenium.svg",
    "description": {
      "en": "I automate browser flows and develop utilities that support web testing.",
      "es": "Automatizo flujos en el navegador y desarrollo utilidades de apoyo para pruebas web."
    },
    "uses": {
      "en": [
        "Browser interactions and assertions",
        "Page objects and reusable flows"
      ],
      "es": [
        "Interacciones y validaciones en el navegador",
        "Page objects y flujos reutilizables"
      ]
    },
    "projects": [
      "web",
      "marka"
    ],
    "official": true
  },
  {
    "id": "playwright",
    "name": "Playwright",
    "file": "playwright.svg",
    "description": {
      "en": "I use Playwright for browser automation and reproducible web tests.",
      "es": "Utilizo Playwright para automatización de navegadores y pruebas web reproducibles."
    },
    "uses": {
      "en": [
        "Browser automation",
        "Reproducible web tests"
      ],
      "es": [
        "Automatización de navegadores",
        "Pruebas web reproducibles"
      ]
    },
    "projects": [],
    "note": {
      "en": "Next practice projects will include JavaScript and TypeScript examples.",
      "es": "Las próximas prácticas incluirán ejemplos con JavaScript y TypeScript."
    }
  },
  {
    "id": "cypress",
    "name": "Cypress",
    "file": "cypress.svg",
    "description": {
      "en": "Experience with web test automation and user flows.",
      "es": "Experiencia con automatización de pruebas web y flujos de usuario."
    },
    "uses": {
      "en": [
        "Web testing",
        "User flows"
      ],
      "es": [
        "Pruebas web",
        "Flujos de usuario"
      ]
    },
    "projects": [],
    "paper": true
  },
  {
    "id": "postman",
    "name": "Postman",
    "file": "postman.svg",
    "description": {
      "en": "I send HTTP requests and inspect responses when testing APIs.",
      "es": "Envío solicitudes HTTP y reviso respuestas al probar APIs."
    },
    "uses": {
      "en": [
        "HTTP requests",
        "Response inspection"
      ],
      "es": [
        "Solicitudes HTTP",
        "Revisión de respuestas"
      ]
    },
    "projects": []
  },
  {
    "id": "git",
    "name": "Git",
    "file": "git.svg",
    "description": {
      "en": "Version control for my automation projects and testing tools.",
      "es": "Control de versiones en mis proyectos de automatización y herramientas de testing."
    },
    "uses": {
      "en": [
        "Change history",
        "Working with branches"
      ],
      "es": [
        "Historial de cambios",
        "Trabajo con ramas"
      ]
    },
    "projects": []
  },
  {
    "id": "github",
    "name": "GitHub",
    "file": "github.svg",
    "description": {
      "en": "I organize, share and publish my projects through GitHub repositories.",
      "es": "Organizo, comparto y publico mis proyectos mediante repositorios de GitHub."
    },
    "uses": {
      "en": [
        "Project repositories",
        "Source code and releases"
      ],
      "es": [
        "Repositorios de proyectos",
        "Código fuente y releases"
      ]
    },
    "projects": [
      "web",
      "api"
    ],
    "mono": true
  },
  {
    "id": "github-actions",
    "name": "GitHub Actions",
    "file": "github-actions.svg",
    "description": {
      "en": "I automate test execution and report publication in my repositories.",
      "es": "Automatizo la ejecución de pruebas y la publicación de reportes en mis repositorios."
    },
    "uses": {
      "en": [
        "Automated test runs",
        "Reports and project publication"
      ],
      "es": [
        "Ejecución automática de pruebas",
        "Reportes y publicación de proyectos"
      ]
    },
    "projects": [
      "web",
      "api"
    ],
    "mono": true
  },
  {
    "id": "docker",
    "name": "Docker",
    "file": "docker.svg",
    "description": {
      "en": "Basic use of containers in development and testing environments.",
      "es": "Uso básico de contenedores en entornos de desarrollo y pruebas."
    },
    "uses": {
      "en": [
        "Running containers",
        "Development and test environments"
      ],
      "es": [
        "Ejecución de contenedores",
        "Entornos de desarrollo y pruebas"
      ]
    },
    "projects": []
  },
  {
    "id": "jira",
    "name": "Jira",
    "file": "jira.svg",
    "description": {
      "en": "I use Jira to follow up on work and record issues.",
      "es": "Utilizo Jira para dar seguimiento al trabajo y registrar incidencias."
    },
    "uses": {
      "en": [
        "Work tracking",
        "Issue recording"
      ],
      "es": [
        "Seguimiento del trabajo",
        "Registro de incidencias"
      ]
    },
    "projects": []
  },
  {
    "id": "xray",
    "name": "Xray",
    "file": "xray.png",
    "description": {
      "en": "I create and execute test cases with Xray integrated into Jira.",
      "es": "Creo y ejecuto casos de prueba con Xray integrado en Jira."
    },
    "uses": {
      "en": [
        "Creating test cases",
        "Executing test cases in Jira"
      ],
      "es": [
        "Creación de casos de prueba",
        "Ejecución de casos en Jira"
      ]
    },
    "projects": [],
    "paper": true
  },
  {
    "id": "confluence",
    "name": "Confluence",
    "file": "confluence.svg",
    "description": {
      "en": "I document and organize information for the team.",
      "es": "Documento y organizo información para el equipo."
    },
    "uses": {
      "en": [
        "Shared documentation",
        "Organizing team information"
      ],
      "es": [
        "Documentación compartida",
        "Organización de información del equipo"
      ]
    },
    "projects": []
  }
];
