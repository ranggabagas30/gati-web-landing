<!-- OPENSPEC:START -->
# OpenSpec Instructions

These instructions are for AI assistants working in this project.

Always open `@/openspec/AGENTS.md` when the request:
- Mentions planning or proposals (words like proposal, spec, change, plan)
- Introduces new capabilities, breaking changes, architecture shifts, or big performance/security work
- Sounds ambiguous and you need the authoritative spec before coding

Use `@/openspec/AGENTS.md` to learn:
- How to create and apply change proposals
- Spec format and conventions
- Project structure and guidelines

Keep this managed block so 'openspec update' can refresh the instructions.

<!-- OPENSPEC:END -->

<!-- Skills section removed -->

<skills_system priority="1">

## Available Skills

<!-- SKILLS_TABLE_START -->
<usage>
When users ask you to perform tasks, check if any of the available skills below can help complete the task more effectively. Skills provide specialized capabilities and domain knowledge.

How to use skills:
- Invoke: `npx openskills read <skill-name>` (run in your shell)
  - For multiple: `npx openskills read skill-one,skill-two`
- The skill content will load with detailed instructions on how to complete the task
- Base directory provided in output for resolving bundled resources (references/, scripts/, assets/)

Usage notes:
- Only use skills listed in <available_skills> below
- Do not invoke a skill that is already loaded in your context
- Each skill invocation is stateless
</usage>

<available_skills>

<skill>
<name>agent-eval</name>
<description>Head-to-head comparison of coding agents (Claude Code, Aider, Codex, etc.) on custom tasks with pass rate, cost, time, and consistency metrics</description>
<location>project</location>
</skill>

<skill>
<name>agent-harness-construction</name>
<description>Design and optimize AI agent action spaces, tool definitions, and observation formatting for higher completion rates.</description>
<location>project</location>
</skill>

<skill>
<name>agentic-engineering</name>
<description>作为代理工程师，采用评估优先执行、分解和成本感知模型路由进行操作。</description>
<location>project</location>
</skill>

<skill>
<name>ai-first-engineering</name>
<description>Engineering operating model for teams where AI agents generate a large share of implementation output.</description>
<location>project</location>
</skill>

<skill>
<name>ai-regression-testing</name>
<description>Regression testing strategies for AI-assisted development. Sandbox-mode API testing without database dependencies, automated bug-check workflows, and patterns to catch AI blind spots where the same model writes and reviews code.</description>
<location>project</location>
</skill>

<skill>
<name>android-clean-architecture</name>
<description>Clean Architecture patterns for Android and Kotlin Multiplatform projects — module structure, dependency rules, UseCases, Repositories, and data layer patterns.</description>
<location>project</location>
</skill>

<skill>
<name>api-design</name>
<description>REST API design patterns including resource naming, status codes, pagination, filtering, error responses, versioning, and rate limiting for production APIs.</description>
<location>project</location>
</skill>

<skill>
<name>architecture-decision-records</name>
<description>Capture architectural decisions made during Claude Code sessions as structured ADRs. Auto-detects decision moments, records context, alternatives considered, and rationale. Maintains an ADR log so future developers understand why the codebase is shaped the way it is.</description>
<location>project</location>
</skill>

<skill>
<name>article-writing</name>
<description>Write articles, guides, blog posts, tutorials, newsletter issues, and other long-form content in a distinctive voice derived from supplied examples or brand guidance. Use when the user wants polished written content longer than a paragraph, especially when voice consistency, structure, and credibility matter.</description>
<location>project</location>
</skill>

<skill>
<name>autonomous-loops</name>
<description>"Patterns and architectures for autonomous Claude Code loops — from simple sequential pipelines to RFC-driven multi-agent DAG systems."</description>
<location>project</location>
</skill>

<skill>
<name>backend-patterns</name>
<description>Backend architecture patterns, API design, database optimization, and server-side best practices for Node.js, Express, and Next.js API routes.</description>
<location>project</location>
</skill>

<skill>
<name>blueprint</name>
<description>>-</description>
<location>project</location>
</skill>

<skill>
<name>bun-runtime</name>
<description>Bun as runtime, package manager, bundler, and test runner. When to choose Bun vs Node, migration notes, and Vercel support.</description>
<location>project</location>
</skill>

<skill>
<name>carrier-relationship-management</name>
<description>></description>
<location>project</location>
</skill>

<skill>
<name>claude-api</name>
<description>Anthropic Claude API patterns for Python and TypeScript. Covers Messages API, streaming, tool use, vision, extended thinking, batches, prompt caching, and Claude Agent SDK. Use when building applications with the Claude API or Anthropic SDKs.</description>
<location>project</location>
</skill>

<skill>
<name>claude-devfleet</name>
<description>通过Claude DevFleet协调多智能体编码任务——规划项目、在隔离的工作树中并行调度智能体、监控进度并读取结构化报告。</description>
<location>project</location>
</skill>

<skill>
<name>click-path-audit</name>
<description>"Trace every user-facing button/touchpoint through its full state change sequence to find bugs where functions individually work but cancel each other out, produce wrong final state, or leave the UI in an inconsistent state. Use when: systematic debugging found no bugs but users report broken buttons, or after any major refactor touching shared state stores."</description>
<location>project</location>
</skill>

<skill>
<name>clickhouse-io</name>
<description>ClickHouse database patterns, query optimization, analytics, and data engineering best practices for high-performance analytical workloads.</description>
<location>project</location>
</skill>

<skill>
<name>codebase-onboarding</name>
<description>Analyze an unfamiliar codebase and generate a structured onboarding guide with architecture map, key entry points, conventions, and a starter CLAUDE.md. Use when joining a new project or setting up Claude Code for the first time in a repo.</description>
<location>project</location>
</skill>

<skill>
<name>coding-standards</name>
<description>Universal coding standards, best practices, and patterns for TypeScript, JavaScript, React, and Node.js development.</description>
<location>project</location>
</skill>

<skill>
<name>compose-multiplatform-patterns</name>
<description>Compose Multiplatform and Jetpack Compose patterns for KMP projects — state management, navigation, theming, performance, and platform-specific UI.</description>
<location>project</location>
</skill>

<skill>
<name>configure-ecc</name>
<description>Interactive installer for Everything Claude Code — guides users through selecting and installing skills and rules to user-level or project-level directories, verifies paths, and optionally optimizes installed files.</description>
<location>project</location>
</skill>

<skill>
<name>content-engine</name>
<description>Create platform-native content systems for X, LinkedIn, TikTok, YouTube, newsletters, and repurposed multi-platform campaigns. Use when the user wants social posts, threads, scripts, content calendars, or one source asset adapted cleanly across platforms.</description>
<location>project</location>
</skill>

<skill>
<name>content-hash-cache-pattern</name>
<description>Cache expensive file processing results using SHA-256 content hashes — path-independent, auto-invalidating, with service layer separation.</description>
<location>project</location>
</skill>

<skill>
<name>context-budget</name>
<description>Audits Claude Code context window consumption across agents, skills, MCP servers, and rules. Identifies bloat, redundant components, and produces prioritized token-savings recommendations.</description>
<location>project</location>
</skill>

<skill>
<name>continuous-agent-loop</name>
<description>Patterns for continuous autonomous agent loops with quality gates, evals, and recovery controls.</description>
<location>project</location>
</skill>

<skill>
<name>continuous-learning</name>
<description>Automatically extract reusable patterns from Claude Code sessions and save them as learned skills for future use.</description>
<location>project</location>
</skill>

<skill>
<name>continuous-learning-v2</name>
<description>Instinct-based learning system that observes sessions via hooks, creates atomic instincts with confidence scoring, and evolves them into skills/commands/agents. v2.1 adds project-scoped instincts to prevent cross-project contamination.</description>
<location>project</location>
</skill>

<skill>
<name>cost-aware-llm-pipeline</name>
<description>Cost optimization patterns for LLM API usage — model routing by task complexity, budget tracking, retry logic, and prompt caching.</description>
<location>project</location>
</skill>

<skill>
<name>cpp-coding-standards</name>
<description>C++ coding standards based on the C++ Core Guidelines (isocpp.github.io). Use when writing, reviewing, or refactoring C++ code to enforce modern, safe, and idiomatic practices.</description>
<location>project</location>
</skill>

<skill>
<name>cpp-testing</name>
<description>Use only when writing/updating/fixing C++ tests, configuring GoogleTest/CTest, diagnosing failing or flaky tests, or adding coverage/sanitizers.</description>
<location>project</location>
</skill>

<skill>
<name>crosspost</name>
<description>Multi-platform content distribution across X, LinkedIn, Threads, and Bluesky. Adapts content per platform using content-engine patterns. Never posts identical content cross-platform. Use when the user wants to distribute content across social platforms.</description>
<location>project</location>
</skill>

<skill>
<name>customs-trade-compliance</name>
<description>></description>
<location>project</location>
</skill>

<skill>
<name>data-scraper-agent</name>
<description>Build a fully automated AI-powered data collection agent for any public source — job boards, prices, news, GitHub, sports, anything. Scrapes on a schedule, enriches data with a free LLM (Gemini Flash), stores results in Notion/Sheets/Supabase, and learns from user feedback. Runs 100% free on GitHub Actions. Use when the user wants to monitor, collect, or track any public data automatically.</description>
<location>project</location>
</skill>

<skill>
<name>database-migrations</name>
<description>Database migration best practices for schema changes, data migrations, rollbacks, and zero-downtime deployments across PostgreSQL, MySQL, and common ORMs (Prisma, Drizzle, Kysely, Django, TypeORM, golang-migrate).</description>
<location>project</location>
</skill>

<skill>
<name>deep-research</name>
<description>Multi-source deep research using firecrawl and exa MCPs. Searches the web, synthesizes findings, and delivers cited reports with source attribution. Use when the user wants thorough research on any topic with evidence and citations.</description>
<location>project</location>
</skill>

<skill>
<name>deployment-patterns</name>
<description>Deployment workflows, CI/CD pipeline patterns, Docker containerization, health checks, rollback strategies, and production readiness checklists for web applications.</description>
<location>project</location>
</skill>

<skill>
<name>django-patterns</name>
<description>Django architecture patterns, REST API design with DRF, ORM best practices, caching, signals, middleware, and production-grade Django apps.</description>
<location>project</location>
</skill>

<skill>
<name>django-security</name>
<description>Django security best practices, authentication, authorization, CSRF protection, SQL injection prevention, XSS prevention, and secure deployment configurations.</description>
<location>project</location>
</skill>

<skill>
<name>django-tdd</name>
<description>Django testing strategies with pytest-django, TDD methodology, factory_boy, mocking, coverage, and testing Django REST Framework APIs.</description>
<location>project</location>
</skill>

<skill>
<name>django-verification</name>
<description>"Verification loop for Django projects: migrations, linting, tests with coverage, security scans, and deployment readiness checks before release or PR."</description>
<location>project</location>
</skill>

<skill>
<name>dmux-workflows</name>
<description>Multi-agent orchestration using dmux (tmux pane manager for AI agents). Patterns for parallel agent workflows across Claude Code, Codex, OpenCode, and other harnesses. Use when running multiple agent sessions in parallel or coordinating multi-agent development workflows.</description>
<location>project</location>
</skill>

<skill>
<name>docker-patterns</name>
<description>Docker and Docker Compose patterns for local development, container security, networking, volume strategies, and multi-service orchestration.</description>
<location>project</location>
</skill>

<skill>
<name>documentation-lookup</name>
<description>Use up-to-date library and framework docs via Context7 MCP instead of training data. Activates for setup questions, API references, code examples, or when the user names a framework (e.g. React, Next.js, Prisma).</description>
<location>project</location>
</skill>

<skill>
<name>e2e-testing</name>
<description>Playwright E2E testing patterns, Page Object Model, configuration, CI/CD integration, artifact management, and flaky test strategies.</description>
<location>project</location>
</skill>

<skill>
<name>energy-procurement</name>
<description>></description>
<location>project</location>
</skill>

<skill>
<name>enterprise-agent-ops</name>
<description>Operate long-lived agent workloads with observability, security boundaries, and lifecycle management.</description>
<location>project</location>
</skill>

<skill>
<name>eval-harness</name>
<description>Formal evaluation framework for Claude Code sessions implementing eval-driven development (EDD) principles</description>
<location>project</location>
</skill>

<skill>
<name>everything-claude-code</name>
<description>Development conventions and patterns for everything-claude-code. JavaScript project with conventional commits.</description>
<location>project</location>
</skill>

<skill>
<name>exa-search</name>
<description>Neural search via Exa MCP for web, code, and company research. Use when the user needs web search, code examples, company intel, people lookup, or AI-powered deep research with Exa's neural search engine.</description>
<location>project</location>
</skill>

<skill>
<name>fal-ai-media</name>
<description>Unified media generation via fal.ai MCP — image, video, and audio. Covers text-to-image (Nano Banana), text/image-to-video (Seedance, Kling, Veo 3), text-to-speech (CSM-1B), and video-to-audio (ThinkSound). Use when the user wants to generate images, videos, or audio with AI.</description>
<location>project</location>
</skill>

<skill>
<name>flutter-dart-code-review</name>
<description>Library-agnostic Flutter/Dart code review checklist covering widget best practices, state management patterns (BLoC, Riverpod, Provider, GetX, MobX, Signals), Dart idioms, performance, accessibility, security, and clean architecture.</description>
<location>project</location>
</skill>

<skill>
<name>foundation-models-on-device</name>
<description>Apple FoundationModels framework for on-device LLM — text generation, guided generation with @Generable, tool calling, and snapshot streaming in iOS 26+.</description>
<location>project</location>
</skill>

<skill>
<name>frontend-patterns</name>
<description>Frontend development patterns for React, Next.js, state management, performance optimization, and UI best practices.</description>
<location>project</location>
</skill>

<skill>
<name>frontend-slides</name>
<description>Create stunning, animation-rich HTML presentations from scratch or by converting PowerPoint files. Use when the user wants to build a presentation, convert a PPT/PPTX to web, or create slides for a talk/pitch. Helps non-designers discover their aesthetic through visual exploration rather than abstract choices.</description>
<location>project</location>
</skill>

<skill>
<name>golang-patterns</name>
<description>Idiomatic Go patterns, best practices, and conventions for building robust, efficient, and maintainable Go applications.</description>
<location>project</location>
</skill>

<skill>
<name>golang-testing</name>
<description>Go testing patterns including table-driven tests, subtests, benchmarks, fuzzing, and test coverage. Follows TDD methodology with idiomatic Go practices.</description>
<location>project</location>
</skill>

<skill>
<name>inventory-demand-planning</name>
<description>></description>
<location>project</location>
</skill>

<skill>
<name>investor-materials</name>
<description>Create and update pitch decks, one-pagers, investor memos, accelerator applications, financial models, and fundraising materials. Use when the user needs investor-facing documents, projections, use-of-funds tables, milestone plans, or materials that must stay internally consistent across multiple fundraising assets.</description>
<location>project</location>
</skill>

<skill>
<name>investor-outreach</name>
<description>Draft cold emails, warm intro blurbs, follow-ups, update emails, and investor communications for fundraising. Use when the user wants outreach to angels, VCs, strategic investors, or accelerators and needs concise, personalized, investor-facing messaging.</description>
<location>project</location>
</skill>

<skill>
<name>iterative-retrieval</name>
<description>Pattern for progressively refining context retrieval to solve the subagent context problem</description>
<location>project</location>
</skill>

<skill>
<name>java-coding-standards</name>
<description>"Java coding standards for Spring Boot services: naming, immutability, Optional usage, streams, exceptions, generics, and project layout."</description>
<location>project</location>
</skill>

<skill>
<name>jpa-patterns</name>
<description>JPA/Hibernate patterns for entity design, relationships, query optimization, transactions, auditing, indexing, pagination, and pooling in Spring Boot.</description>
<location>project</location>
</skill>

<skill>
<name>kotlin-coroutines-flows</name>
<description>Kotlin Coroutines and Flow patterns for Android and KMP — structured concurrency, Flow operators, StateFlow, error handling, and testing.</description>
<location>project</location>
</skill>

<skill>
<name>kotlin-exposed-patterns</name>
<description>JetBrains Exposed ORM patterns including DSL queries, DAO pattern, transactions, HikariCP connection pooling, Flyway migrations, and repository pattern.</description>
<location>project</location>
</skill>

<skill>
<name>kotlin-ktor-patterns</name>
<description>Ktor server patterns including routing DSL, plugins, authentication, Koin DI, kotlinx.serialization, WebSockets, and testApplication testing.</description>
<location>project</location>
</skill>

<skill>
<name>kotlin-patterns</name>
<description>Idiomatic Kotlin patterns, best practices, and conventions for building robust, efficient, and maintainable Kotlin applications with coroutines, null safety, and DSL builders.</description>
<location>project</location>
</skill>

<skill>
<name>kotlin-testing</name>
<description>Kotlin testing patterns with Kotest, MockK, coroutine testing, property-based testing, and Kover coverage. Follows TDD methodology with idiomatic Kotlin practices.</description>
<location>project</location>
</skill>

<skill>
<name>laravel-patterns</name>
<description>Laravel architecture patterns, routing/controllers, Eloquent ORM, service layers, queues, events, caching, and API resources for production apps.</description>
<location>project</location>
</skill>

<skill>
<name>laravel-security</name>
<description>Laravel security best practices for authn/authz, validation, CSRF, mass assignment, file uploads, secrets, rate limiting, and secure deployment.</description>
<location>project</location>
</skill>

<skill>
<name>laravel-tdd</name>
<description>Test-driven development for Laravel with PHPUnit and Pest, factories, database testing, fakes, and coverage targets.</description>
<location>project</location>
</skill>

<skill>
<name>laravel-verification</name>
<description>Verification loop for Laravel projects: env checks, linting, static analysis, tests with coverage, security scans, and deployment readiness.</description>
<location>project</location>
</skill>

<skill>
<name>liquid-glass-design</name>
<description>iOS 26 Liquid Glass design system — dynamic glass material with blur, reflection, and interactive morphing for SwiftUI, UIKit, and WidgetKit.</description>
<location>project</location>
</skill>

<skill>
<name>logistics-exception-management</name>
<description>></description>
<location>project</location>
</skill>

<skill>
<name>market-research</name>
<description>Conduct market research, competitive analysis, investor due diligence, and industry intelligence with source attribution and decision-oriented summaries. Use when the user wants market sizing, competitor comparisons, fund research, technology scans, or research that informs business decisions.</description>
<location>project</location>
</skill>

<skill>
<name>mcp-server-patterns</name>
<description>Build MCP servers with Node/TypeScript SDK — tools, resources, prompts, Zod validation, stdio vs Streamable HTTP. Use Context7 or official MCP docs for latest API.</description>
<location>project</location>
</skill>

<skill>
<name>nanoclaw-repl</name>
<description>Operate and extend NanoClaw v2, ECC's zero-dependency session-aware REPL built on claude -p.</description>
<location>project</location>
</skill>

<skill>
<name>nextjs-turbopack</name>
<description>Next.js 16+ and Turbopack — incremental bundling, FS caching, dev speed, and when to use Turbopack vs webpack.</description>
<location>project</location>
</skill>

<skill>
<name>nutrient-document-processing</name>
<description>Process, convert, OCR, extract, redact, sign, and fill documents using the Nutrient DWS API. Works with PDFs, DOCX, XLSX, PPTX, HTML, and images.</description>
<location>project</location>
</skill>

<skill>
<name>nuxt4-patterns</name>
<description>Nuxt 4 app patterns for hydration safety, performance, route rules, lazy loading, and SSR-safe data fetching with useFetch and useAsyncData.</description>
<location>project</location>
</skill>

<skill>
<name>perl-patterns</name>
<description>Modern Perl 5.36+ idioms, best practices, and conventions for building robust, maintainable Perl applications.</description>
<location>project</location>
</skill>

<skill>
<name>perl-security</name>
<description>Comprehensive Perl security covering taint mode, input validation, safe process execution, DBI parameterized queries, web security (XSS/SQLi/CSRF), and perlcritic security policies.</description>
<location>project</location>
</skill>

<skill>
<name>perl-testing</name>
<description>Perl testing patterns using Test2::V0, Test::More, prove runner, mocking, coverage with Devel::Cover, and TDD methodology.</description>
<location>project</location>
</skill>

<skill>
<name>plankton-code-quality</name>
<description>"Write-time code quality enforcement using Plankton — auto-formatting, linting, and Claude-powered fixes on every file edit via hooks."</description>
<location>project</location>
</skill>

<skill>
<name>postgres-patterns</name>
<description>PostgreSQL database patterns for query optimization, schema design, indexing, and security. Based on Supabase best practices.</description>
<location>project</location>
</skill>

<skill>
<name>production-scheduling</name>
<description>></description>
<location>project</location>
</skill>

<skill>
<name>project-guidelines-example</name>
<description>"Example project-specific skill template based on a real production application."</description>
<location>project</location>
</skill>

<skill>
<name>prompt-optimizer</name>
<description>>-</description>
<location>project</location>
</skill>

<skill>
<name>python-patterns</name>
<description>Pythonic idioms, PEP 8 standards, type hints, and best practices for building robust, efficient, and maintainable Python applications.</description>
<location>project</location>
</skill>

<skill>
<name>python-testing</name>
<description>Python testing strategies using pytest, TDD methodology, fixtures, mocking, parametrization, and coverage requirements.</description>
<location>project</location>
</skill>

<skill>
<name>pytorch-patterns</name>
<description>PyTorch deep learning patterns and best practices for building robust, efficient, and reproducible training pipelines, model architectures, and data loading.</description>
<location>project</location>
</skill>

<skill>
<name>quality-nonconformance</name>
<description>></description>
<location>project</location>
</skill>

<skill>
<name>ralphinho-rfc-pipeline</name>
<description>RFC-driven multi-agent DAG execution pattern with quality gates, merge queues, and work unit orchestration.</description>
<location>project</location>
</skill>

<skill>
<name>regex-vs-llm-structured-text</name>
<description>Decision framework for choosing between regex and LLM when parsing structured text — start with regex, add LLM only for low-confidence edge cases.</description>
<location>project</location>
</skill>

<skill>
<name>returns-reverse-logistics</name>
<description>></description>
<location>project</location>
</skill>

<skill>
<name>rules-distill</name>
<description>"Scan skills to extract cross-cutting principles and distill them into rules — append, revise, or create new rule files"</description>
<location>project</location>
</skill>

<skill>
<name>rust-patterns</name>
<description>Idiomatic Rust patterns, ownership, error handling, traits, concurrency, and best practices for building safe, performant applications.</description>
<location>project</location>
</skill>

<skill>
<name>rust-testing</name>
<description>Rust testing patterns including unit tests, integration tests, async testing, property-based testing, mocking, and coverage. Follows TDD methodology.</description>
<location>project</location>
</skill>

<skill>
<name>santa-method</name>
<description>"Multi-agent adversarial verification with convergence loop. Two independent review agents must both pass before output ships."</description>
<location>project</location>
</skill>

<skill>
<name>search-first</name>
<description>Research-before-coding workflow. Search for existing tools, libraries, and patterns before writing custom code. Invokes the researcher agent.</description>
<location>project</location>
</skill>

<skill>
<name>security-review</name>
<description>Use this skill when adding authentication, handling user input, working with secrets, creating API endpoints, or implementing payment/sensitive features. Provides comprehensive security checklist and patterns.</description>
<location>project</location>
</skill>

<skill>
<name>security-scan</name>
<description>Scan your Claude Code configuration (.claude/ directory) for security vulnerabilities, misconfigurations, and injection risks using AgentShield. Checks CLAUDE.md, settings.json, MCP servers, hooks, and agent definitions.</description>
<location>project</location>
</skill>

<skill>
<name>skill-comply</name>
<description>Visualize whether skills, rules, and agent definitions are actually followed — auto-generates scenarios at 3 prompt strictness levels, runs agents, classifies behavioral sequences, and reports compliance rates with full tool call timelines</description>
<location>project</location>
</skill>

<skill>
<name>skill-stocktake</name>
<description>"Use when auditing Claude skills and commands for quality. Supports Quick Scan (changed skills only) and Full Stocktake modes with sequential subagent batch evaluation."</description>
<location>project</location>
</skill>

<skill>
<name>springboot-patterns</name>
<description>Spring Boot architecture patterns, REST API design, layered services, data access, caching, async processing, and logging. Use for Java Spring Boot backend work.</description>
<location>project</location>
</skill>

<skill>
<name>springboot-security</name>
<description>Spring Security best practices for authn/authz, validation, CSRF, secrets, headers, rate limiting, and dependency security in Java Spring Boot services.</description>
<location>project</location>
</skill>

<skill>
<name>springboot-tdd</name>
<description>Test-driven development for Spring Boot using JUnit 5, Mockito, MockMvc, Testcontainers, and JaCoCo. Use when adding features, fixing bugs, or refactoring.</description>
<location>project</location>
</skill>

<skill>
<name>springboot-verification</name>
<description>"Verification loop for Spring Boot projects: build, static analysis, tests with coverage, security scans, and diff review before release or PR."</description>
<location>project</location>
</skill>

<skill>
<name>strategic-compact</name>
<description>Suggests manual context compaction at logical intervals to preserve context through task phases rather than arbitrary auto-compaction.</description>
<location>project</location>
</skill>

<skill>
<name>swift-actor-persistence</name>
<description>Thread-safe data persistence in Swift using actors — in-memory cache with file-backed storage, eliminating data races by design.</description>
<location>project</location>
</skill>

<skill>
<name>swift-concurrency-6-2</name>
<description>Swift 6.2 Approachable Concurrency — single-threaded by default, @concurrent for explicit background offloading, isolated conformances for main actor types.</description>
<location>project</location>
</skill>

<skill>
<name>swift-protocol-di-testing</name>
<description>Protocol-based dependency injection for testable Swift code — mock file system, network, and external APIs using focused protocols and Swift Testing.</description>
<location>project</location>
</skill>

<skill>
<name>swiftui-patterns</name>
<description>SwiftUI architecture patterns, state management with @Observable, view composition, navigation, performance optimization, and modern iOS/macOS UI best practices.</description>
<location>project</location>
</skill>

<skill>
<name>tdd-workflow</name>
<description>Use this skill when writing new features, fixing bugs, or refactoring code. Enforces test-driven development with 80%+ coverage including unit, integration, and E2E tests.</description>
<location>project</location>
</skill>

<skill>
<name>team-builder</name>
<description>Interactive agent picker for composing and dispatching parallel teams</description>
<location>project</location>
</skill>

<skill>
<name>verification-loop</name>
<description>"A comprehensive verification system for Claude Code sessions."</description>
<location>project</location>
</skill>

<skill>
<name>video-editing</name>
<description>AI-assisted video editing workflows for cutting, structuring, and augmenting real footage. Covers the full pipeline from raw capture through FFmpeg, Remotion, ElevenLabs, fal.ai, and final polish in Descript or CapCut. Use when the user wants to edit video, cut footage, create vlogs, or build video content.</description>
<location>project</location>
</skill>

<skill>
<name>videodb</name>
<description>See, Understand, Act on video and audio. See- ingest from local files, URLs, RTSP/live feeds, or live record desktop; return realtime context and playable stream links. Understand- extract frames, build visual/semantic/temporal indexes, and search moments with timestamps and auto-clips. Act- transcode and normalize (codec, fps, resolution, aspect ratio), perform timeline edits (subtitles, text/image overlays, branding, audio overlays, dubbing, translation), generate media assets (image, audio, video), and create real time alerts for events from live streams or desktop capture.</description>
<location>project</location>
</skill>

<skill>
<name>visa-doc-translate</name>
<description>Translate visa application documents (images) to English and create a bilingual PDF with original and translation</description>
<location>project</location>
</skill>

<skill>
<name>x-api</name>
<description>X/Twitter API integration for posting tweets, threads, reading timelines, search, and analytics. Covers OAuth auth patterns, rate limits, and platform-native content posting. Use when the user wants to interact with X programmatically.</description>
<location>project</location>
</skill>

</available_skills>
<!-- SKILLS_TABLE_END -->

</skills_system>
