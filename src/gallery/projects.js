// Source excerpts verified against the project READMEs on 2026-10-15.
export const projects = [
  {
    "id": "web",
    "name": {
      "en": "Web testing",
      "es": "Pruebas web"
    },
    "repo": "robotframework-selenium-testing",
    "kind": "practice",
    "color": "#7bdcb5",
    "surface": "#142623",
    "icon": "browser",
    "description": {
      "en": "Robot Framework + Selenium. From data to browser flows.",
      "es": "Robot Framework + Selenium. De los datos a los flujos web."
    },
    "tech": [
      "Robot Framework",
      "Selenium",
      "Python",
      "GitHub Actions"
    ],
    "code": "Registrar Cliente Y Consultar Sus Cuentas\n    [Arguments]    ${row_index}\n    ${data_table}=    Cargar Datos Del Cliente    ${row_index}\n    Registrar Cliente    ${data_table}\n    Cerrar Sesión\n    Iniciar Sesión    ${data_table}\n    Consultar Cuentas Del Cliente    ${data_table}\n    Cerrar Sesión",
    "language": "Robot Framework",
    "previewLines": [
      0,
      3,
      4,
      5,
      6,
      7
    ],
    "previewLabel": "tests / use_cases / pages",
    "overview": {
      "en": "Browser automation against ParaBank, organized into test scenarios, complete use cases and declarative page locators.",
      "es": "Automatización de ParaBank organizada en escenarios, casos de uso completos y localizadores declarativos."
    },
    "sections": [
      {
        "title": {
          "en": "How it's organized",
          "es": "Cómo está organizado"
        },
        "body": {
          "en": "Tests compose infrastructure and prepare data. Use cases drive SeleniumLibrary. Pages contain Python locator classes and instances, without browser actions.",
          "es": "Las suites componen la infraestructura y preparan datos. Los casos de uso llaman SeleniumLibrary. Las Pages contienen clases e instancias de localizadores Python, sin acciones del navegador."
        }
      },
      {
        "title": {
          "en": "Data and evidence",
          "es": "Datos y evidencia"
        },
        "body": {
          "en": "DataDriver selects scenarios by row. pytabify and Faker prepare their data. Marka annotates the browser, and Evidence Reporter captures the flow.",
          "es": "DataDriver selecciona escenarios por fila. pytabify y Faker preparan los datos. Marka anota el navegador y Evidence Reporter conserva el flujo."
        }
      },
      {
        "title": {
          "en": "Execution",
          "es": "Ejecución"
        },
        "body": {
          "en": "GitHub Actions checks lint and dry runs, then runs browser scenarios. Published reports retain the actual outcomes; ParaBank is a shared public demo.",
          "es": "GitHub Actions verifica lint y dry run, y ejecuta los escenarios en navegador. Los reportes conservan sus resultados reales; ParaBank es un demo público compartido."
        }
      }
    ],
    "links": [
      {
        "kind": "repo",
        "url": "https://github.com/angel-valdezzz/robotframework-selenium-testing"
      },
      {
        "kind": "architecture",
        "url": "https://github.com/angel-valdezzz/robotframework-selenium-testing/blob/main/docs/architecture.md"
      },
      {
        "kind": "reports",
        "url": "https://angel-valdezzz.github.io/robotframework-selenium-testing/"
      }
    ]
  },
  {
    "id": "api",
    "name": {
      "en": "API testing",
      "es": "Pruebas API"
    },
    "repo": "robotframework-api-testing",
    "kind": "practice",
    "color": "#79cff0",
    "surface": "#12232c",
    "icon": "braces",
    "description": {
      "en": "Requests, payloads, assertions and cleanup.",
      "es": "Peticiones, payloads, validaciones y limpieza."
    },
    "tech": [
      "Robot Framework",
      "RequestsLibrary",
      "Paylo",
      "GitHub Actions"
    ],
    "code": "Library    Paylo\n\nVAR    &{values}    name=Ana    email=ana@example.com    role=support\n${body}=    Render JSON File    ${CURDIR}/data/payloads/create-user.json    ${values}",
    "language": "Robot Framework",
    "previewLines": [
      0,
      2,
      3
    ],
    "previewLabel": "Demo Users API / Paylo",
    "overview": {
      "en": "Business flows against the independent Demo Users API: CRUD, authentication, validation errors and data-driven roles.",
      "es": "Flujos de negocio contra Demo Users API, un proyecto independiente: CRUD, autenticación, errores de validación y roles con datos parametrizados."
    },
    "sections": [
      {
        "title": {
          "en": "A real service",
          "es": "Un servicio real"
        },
        "body": {
          "en": "The local runner starts the separate FastAPI project. Services send requests; assertion resources validate behavior and cleanup removes created users.",
          "es": "El runner local inicia el proyecto FastAPI independiente. Los recursos de servicios envían peticiones; las assertions validan el comportamiento y el teardown elimina los usuarios creados."
        }
      },
      {
        "title": {
          "en": "Payloads and observability",
          "es": "Payloads y observabilidad"
        },
        "body": {
          "en": "Paylo renders typed JSON templates. Request Reporter and Request Logger record the same HTTP response and executed assertions.",
          "es": "Paylo genera payloads desde plantillas JSON conservando tipos. Request Reporter y Request Logger registran la misma respuesta HTTP y las assertions ejecutadas."
        }
      },
      {
        "title": {
          "en": "Honest results",
          "es": "Resultados reales"
        },
        "body": {
          "en": "The demo deliberately includes a failing role assertion and a skipped case. CI verifies those expected outcomes, and sanitizes generated outputs before publication.",
          "es": "El demo incluye deliberadamente una assertion fallida de rol y un caso omitido. CI verifica esos resultados esperados y procesa la salida para retirar credenciales antes de publicar."
        }
      }
    ],
    "links": [
      {
        "kind": "repo",
        "url": "https://github.com/angel-valdezzz/robotframework-api-testing"
      },
      {
        "kind": "architecture",
        "url": "https://github.com/angel-valdezzz/robotframework-api-testing/blob/main/docs/architecture.md"
      },
      {
        "kind": "reports",
        "url": "https://angel-valdezzz.github.io/robotframework-api-testing/"
      }
    ],
    "previewCode": "{\n  \"name\": \"{{name}}\",\n  \"email\": \"{{email}}\",\n  \"role\": \"{{role}}\"\n}"
  },
  {
    "id": "evidence",
    "name": {
      "en": "Evidence Reporter",
      "es": "Evidence Reporter"
    },
    "repo": "robotframework-evidence-reporter",
    "kind": "tool",
    "color": "#9fa8f5",
    "surface": "#1b2035",
    "icon": "file",
    "description": {
      "en": "Case evidence in HTML, PDF and Word.",
      "es": "Evidencias por caso en HTML, PDF y Word."
    },
    "tech": [
      "Python",
      "Robot Framework",
      "Pabot"
    ],
    "image": "/assets/projects/evidence-reporter.webp",
    "imageSize": [
      1280,
      879
    ],
    "imageAlt": {
      "en": "Actual Evidence Reporter HTML output with case context, milestones and screenshots.",
      "es": "Salida HTML real de Evidence Reporter con contexto del caso, hitos y capturas."
    },
    "overview": {
      "en": "I built this to preserve the context behind screenshots: what happened, at which milestone, and in which test case.",
      "es": "Lo construí para conservar el contexto detrás de cada captura: qué ocurrió, en qué hito y en qué caso de prueba."
    },
    "sections": [
      {
        "title": {
          "en": "From execution to a report",
          "es": "De la ejecución al reporte"
        },
        "body": {
          "en": "A Robot Framework listener records case evidence. A separate build step turns it into navigable HTML, PDF and Word reports.",
          "es": "Un listener de Robot Framework registra evidencias por caso. Un paso posterior genera reportes navegables en HTML, PDF y Word."
        }
      },
      {
        "title": {
          "en": "Design decisions",
          "es": "Decisiones técnicas"
        },
        "body": {
          "en": "Independent cases, explicit milestone context and post-run generation keep collection separate from presentation and support parallel execution.",
          "es": "Casos independientes, contexto explícito por hito y generación posterior separan la captura de la presentación y permiten integrarlo con ejecución paralela."
        }
      }
    ],
    "links": [
      {
        "kind": "repo",
        "url": "https://github.com/angel-valdezzz/robotframework-evidence-reporter"
      },
      {
        "kind": "docs",
        "url": "https://angel-valdezzz.github.io/robotframework-evidence-reporter/",
        "es": "https://angel-valdezzz.github.io/robotframework-evidence-reporter/es/"
      },
      {
        "kind": "example",
        "url": "https://angel-valdezzz.github.io/robotframework-evidence-reporter/demo/passed.html"
      }
    ]
  },
  {
    "id": "marka",
    "name": {
      "en": "Marka",
      "es": "Marka"
    },
    "repo": "robotframework-marka",
    "kind": "tool",
    "color": "#ff9b83",
    "surface": "#2b1e24",
    "icon": "target",
    "description": {
      "en": "Highlights and annotations for Selenium.",
      "es": "Resaltados y anotaciones para Selenium."
    },
    "tech": [
      "Python",
      "Robot Framework",
      "Selenium"
    ],
    "image": "/assets/projects/marka.webp",
    "imageSize": [
      1100,
      594
    ],
    "imageAlt": {
      "en": "Actual Marka output with a highlighted form, numbered dots and a note.",
      "es": "Salida real de Marka con un formulario resaltado, puntos numerados y una nota."
    },
    "overview": {
      "en": "A screenshot is easier to understand when it shows exactly which element matters. Marka adds that context before capture.",
      "es": "Una captura se entiende mejor cuando señala exactamente qué elemento importa. Marka añade ese contexto antes de capturar."
    },
    "sections": [
      {
        "title": {
          "en": "What it adds",
          "es": "Qué aporta"
        },
        "body": {
          "en": "Highlights, numbered dots, labels and notes around Selenium elements. It can also annotate images from Python.",
          "es": "Resaltados, puntos numerados, etiquetas y notas alrededor de elementos Selenium. También permite anotar imágenes desde Python."
        }
      },
      {
        "title": {
          "en": "Integration",
          "es": "Integración"
        },
        "body": {
          "en": "Annotations are grouped and can be cleared after capture. The web practice project uses them with Evidence Reporter to document browser flows.",
          "es": "Las anotaciones se agrupan y se pueden limpiar después de capturar. El proyecto de prácticas web las combina con Evidence Reporter para documentar recorridos."
        }
      }
    ],
    "links": [
      {
        "kind": "repo",
        "url": "https://github.com/angel-valdezzz/robotframework-marka"
      },
      {
        "kind": "docs",
        "url": "https://angel-valdezzz.github.io/robotframework-marka/",
        "es": "https://angel-valdezzz.github.io/robotframework-marka/es/"
      },
      {
        "kind": "example",
        "url": "https://angel-valdezzz.github.io/robotframework-marka/examples/"
      }
    ]
  },
  {
    "id": "paylo",
    "name": {
      "en": "Paylo",
      "es": "Paylo"
    },
    "repo": "robotframework-paylo",
    "kind": "tool",
    "color": "#c3a0f5",
    "surface": "#251e32",
    "icon": "braces",
    "description": {
      "en": "JSON templates that preserve data types.",
      "es": "Plantillas JSON que conservan los tipos de datos."
    },
    "tech": [
      "Python",
      "Robot Framework",
      "JSON"
    ],
    "code": "from paylo import render_template\n\npayload = render_template(\n    {\"name\": \"{{customer.name}}\", \"quantity\": \"{{quantity}}\"},\n    {\"customer\": {\"name\": \"Ana\"}, \"quantity\": 3},\n)\nassert payload == {\"name\": \"Ana\", \"quantity\": 3}",
    "language": "Python",
    "previewLines": [
      0,
      2,
      3,
      4,
      5
    ],
    "previewLabel": "paylo / render_template",
    "overview": {
      "en": "Reusable JSON payload templates, with explicit variables and the original value types intact.",
      "es": "Plantillas reutilizables de payloads JSON, con variables explícitas y los tipos de los valores intactos."
    },
    "sections": [
      {
        "title": {
          "en": "The problem",
          "es": "El problema"
        },
        "body": {
          "en": "String concatenation makes payloads fragile and can turn numbers or booleans into text. Paylo resolves explicit template variables and reports missing values.",
          "es": "Concatenar strings vuelve frágiles los payloads y puede convertir números o booleanos en texto. Paylo resuelve variables explícitas y señala los valores faltantes."
        }
      },
      {
        "title": {
          "en": "Where I use it",
          "es": "Cómo lo uso"
        },
        "body": {
          "en": "The API practice suite renders POST, PUT and PATCH bodies from JSON files. Python users can use the core package without the Robot adapter.",
          "es": "La práctica API genera los bodies de POST, PUT y PATCH desde archivos JSON. El núcleo Python se puede usar sin instalar el adaptador de Robot."
        }
      }
    ],
    "links": [
      {
        "kind": "repo",
        "url": "https://github.com/angel-valdezzz/robotframework-paylo"
      },
      {
        "kind": "docs",
        "url": "https://angel-valdezzz.github.io/robotframework-paylo/",
        "es": "https://angel-valdezzz.github.io/robotframework-paylo/es/"
      },
      {
        "kind": "source",
        "url": "https://github.com/angel-valdezzz/robotframework-paylo/blob/main/README.md"
      }
    ],
    "previewCode": "payload = render_template(\n    {\"name\": \"{{customer.name}}\",\n     \"quantity\": \"{{quantity}}\"},\n    {\"customer\": {\"name\": \"Ana\"},\n     \"quantity\": 3},\n)"
  },
  {
    "id": "pytabify",
    "name": {
      "en": "pytabify",
      "es": "pytabify"
    },
    "repo": "pytabify",
    "kind": "tool",
    "color": "#ebc67c",
    "surface": "#29251b",
    "icon": "table",
    "description": {
      "en": "Read, update and export tabular test data.",
      "es": "Leer, actualizar y exportar datos tabulares de prueba."
    },
    "tech": [
      "Python",
      "Robot Framework",
      "CSV / JSON / XLSX"
    ],
    "code": "from pytabify import DataTableCreator, DataTableSaver\n\ntable = DataTableCreator.from_records([\n    {\"name\": \"Ana\", \"active\": True},\n    {\"name\": \"Luis\", \"active\": False},\n])\nassert table[0].name == table[0][\"name\"] == \"Ana\"\nassert table[0].active is True\n\ntable[0].folio = \"F-001\"\nassert table[1].folio is None\nDataTableSaver.into_json(table, \"cases.json\")",
    "language": "Python",
    "previewLines": [
      2,
      3,
      4,
      5,
      7
    ],
    "previewLabel": "pytabify / CSV · JSON · XLSX",
    "overview": {
      "en": "One tabular data API for Python and Robot Framework, from reading test inputs to explicitly saving updates.",
      "es": "Una API de datos tabulares para Python y Robot Framework, desde leer entradas de prueba hasta guardar actualizaciones explícitamente."
    },
    "sections": [
      {
        "title": {
          "en": "A consistent interface",
          "es": "Una interfaz consistente"
        },
        "body": {
          "en": "Read CSV, JSON and XLSX; access fields by attribute or key; update columns and export the result. The official Robot wrapper exposes the same workflow.",
          "es": "Leer CSV, JSON y XLSX; acceder por atributo o clave; actualizar columnas y exportar. El wrapper oficial de Robot expone el mismo flujo."
        }
      },
      {
        "title": {
          "en": "Deliberate boundaries",
          "es": "Límites deliberados"
        },
        "body": {
          "en": "CSV values remain strings. Other supported sources preserve their types. Updates stay in memory until an explicit save; nested business objects are outside the flat-table model.",
          "es": "CSV conserva sus valores como texto. Las demás fuentes compatibles conservan tipos. Los cambios quedan en memoria hasta guardar explícitamente; el modelo es de tablas planas."
        }
      }
    ],
    "links": [
      {
        "kind": "repo",
        "url": "https://github.com/angel-valdezzz/pytabify"
      },
      {
        "kind": "docs",
        "url": "https://angel-valdezzz.github.io/pytabify/",
        "es": "https://angel-valdezzz.github.io/pytabify/es/"
      },
      {
        "kind": "source",
        "url": "https://github.com/angel-valdezzz/pytabify/blob/main/README.md"
      }
    ]
  },
  {
    "id": "logger",
    "name": {
      "en": "Request Logger",
      "es": "Request Logger"
    },
    "repo": "robotframework-request-logger",
    "kind": "tool",
    "color": "#badb82",
    "surface": "#22291a",
    "icon": "terminal",
    "description": {
      "en": "HTTP exchanges and assertions in the console.",
      "es": "Intercambios HTTP y assertions en la consola."
    },
    "tech": [
      "Python",
      "Robot Framework",
      "Rich"
    ],
    "language": "Robot Framework",
    "previewLabel": "RequestLogger / console",
    "overview": {
      "en": "Console output that connects requests, responses and recorded assertion results without replacing Robot's own execution result.",
      "es": "Salida de consola que conecta peticiones, respuestas y resultados de assertions sin sustituir el resultado de ejecución de Robot."
    },
    "sections": [
      {
        "title": {
          "en": "Focused output",
          "es": "Salida enfocada"
        },
        "body": {
          "en": "Summary, failures and full modes control the amount of detail. Pygments themes color JSON, with a plain-text fallback for CI.",
          "es": "Los modos summary, failures y full controlan el detalle. Los temas de Pygments dan color al JSON, con salida de texto plano para CI."
        }
      },
      {
        "title": {
          "en": "Separate responsibilities",
          "es": "Responsabilidades separadas"
        },
        "body": {
          "en": "The library buffers output until each test ends. It sends no HTTP requests and runs no assertions: it records existing outcomes, so callers must preserve actual test failures.",
          "es": "La librería guarda la salida hasta que termina cada test. No envía peticiones ni ejecuta assertions: registra resultados existentes, por lo que quien la usa debe conservar los fallos reales."
        }
      }
    ],
    "links": [
      {
        "kind": "repo",
        "url": "https://github.com/angel-valdezzz/robotframework-request-logger"
      },
      {
        "kind": "docs",
        "url": "https://angel-valdezzz.github.io/robotframework-request-logger/",
        "es": "https://angel-valdezzz.github.io/robotframework-request-logger/es/"
      },
      {
        "kind": "example",
        "url": "https://angel-valdezzz.github.io/robotframework-request-logger/console/"
      }
    ],
    "image": "/assets/projects/request-logger.svg",
    "imageSize": [
      994,
      440
    ],
    "imageAlt": {
      "en": "Actual Rich console export from Robot executions, with recorded HTTP exchanges and assertion results.",
      "es": "Exportación real de la consola Rich desde ejecuciones Robot, con intercambios HTTP y resultados de assertions."
    }
  },
  {
    "id": "reporter",
    "name": {
      "en": "Request Reporter",
      "es": "Request Reporter"
    },
    "repo": "robotframework-request-reporter",
    "kind": "tool",
    "color": "#87b9f5",
    "surface": "#172537",
    "icon": "file",
    "description": {
      "en": "HTTP case reports in standalone HTML.",
      "es": "Reportes HTTP por caso en HTML independiente."
    },
    "tech": [
      "Python",
      "Robot Framework",
      "HTML"
    ],
    "image": "/assets/projects/request-reporter.webp",
    "imageSize": [
      1280,
      879
    ],
    "imageAlt": {
      "en": "Actual Request Reporter output showing HTTP exchanges, JSON and assertion results.",
      "es": "Salida real de Request Reporter con intercambios HTTP, JSON y resultados de assertions."
    },
    "overview": {
      "en": "A navigable record of each HTTP exchange and its validations, keeping a whole API test case together.",
      "es": "Un registro navegable de cada intercambio HTTP y sus validaciones, conservando el caso API completo."
    },
    "sections": [
      {
        "title": {
          "en": "More than an HTTP status",
          "es": "Más que un estado HTTP"
        },
        "body": {
          "en": "Requests, responses and executed assertions remain connected. HTTP 200 is not treated as proof that a business assertion passed.",
          "es": "Peticiones, respuestas y assertions ejecutadas permanecen conectadas. HTTP 200 no se toma como prueba de que una validación de negocio pasó."
        }
      },
      {
        "title": {
          "en": "Portable evidence",
          "es": "Evidencia portable"
        },
        "body": {
          "en": "Each case produces standalone HTML that can be reviewed offline or attached to an issue. The API practice project generates reports from its actual execution.",
          "es": "Cada caso genera HTML independiente para revisar sin conexión o adjuntar a una incidencia. La práctica API genera estos reportes desde su ejecución real."
        }
      }
    ],
    "links": [
      {
        "kind": "repo",
        "url": "https://github.com/angel-valdezzz/robotframework-request-reporter"
      },
      {
        "kind": "docs",
        "url": "https://angel-valdezzz.github.io/robotframework-request-reporter/",
        "es": "https://angel-valdezzz.github.io/robotframework-request-reporter/es/"
      },
      {
        "kind": "example",
        "url": "https://angel-valdezzz.github.io/robotframework-request-reporter/examples/report.html"
      }
    ]
  },
  {
    "id": "testscript",
    "name": {
      "en": "TestScript",
      "es": "TestScript"
    },
    "repo": "testscript",
    "kind": "experimental",
    "color": "#e9a4cd",
    "surface": "#2b1e2b",
    "icon": "code",
    "description": {
      "en": "A typed language for web and API testing.",
      "es": "Un lenguaje tipado para pruebas web y API."
    },
    "tech": [
      "Python",
      "Lark",
      ".tscr",
      "Web / API"
    ],
    "code": "flow verifyName(name: String) {\n    step \"Validate the name\" {\n        expect len(name) > 0\n    }\n}\n\ntest \"A valid user\" tags [\"smoke\"] {\n    verifyName(\"Angel\")\n}",
    "language": "TestScript",
    "previewLines": [
      0,
      1,
      2,
      3,
      4
    ],
    "previewLabel": "testscript / .tscr",
    "overview": {
      "en": "An experimental typed testing language with a Python interpreter, Lark grammar and a CLI for checking and running .tscr files.",
      "es": "Un lenguaje experimental y tipado de pruebas con intérprete Python, gramática Lark y una CLI para verificar y ejecutar archivos .tscr."
    },
    "sections": [
      {
        "title": {
          "en": "Language building blocks",
          "es": "Piezas del lenguaje"
        },
        "body": {
          "en": "Tests are execution units; flows compose reusable behavior; fixtures handle setup and teardown; steps and expectations retain a test's intent.",
          "es": "Los tests son unidades ejecutables; los flows componen comportamiento reutilizable; las fixtures manejan setup y teardown; steps y expect conservan la intención de la prueba."
        }
      },
      {
        "title": {
          "en": "Current scope",
          "es": "Alcance actual"
        },
        "body": {
          "en": "Web and API automation with static checks and JSON, JUnit XML and HTML results. The language is experimental and its specification evolves with the implementation. Its PyPI package is testscript-lang.",
          "es": "Automatización web y API con verificaciones estáticas y resultados JSON, JUnit XML y HTML. El lenguaje es experimental y su especificación evoluciona junto con la implementación. El paquete PyPI es testscript-lang."
        }
      }
    ],
    "links": [
      {
        "kind": "repo",
        "url": "https://github.com/angel-valdezzz/testscript"
      },
      {
        "kind": "docs",
        "url": "https://angel-valdezzz.github.io/testscript/",
        "es": "https://angel-valdezzz.github.io/testscript/es/"
      },
      {
        "kind": "source",
        "url": "https://github.com/angel-valdezzz/testscript/blob/main/README.md"
      }
    ]
  }
];
