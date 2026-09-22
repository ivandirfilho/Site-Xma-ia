import { execSync } from 'node:child_process';

/**
 * Script de diagnóstico automatizado de CI para Agentes de IA e Desenvolvedores.
 * Em conformidade com ISO/IEC 42001 (Rastreabilidade) e ISO/IEC 27001 (Gestão de Incidentes).
 *
 * @param {string} cmd Comando shell a ser executado
 * @returns {string|null} Saída em texto do comando ou null em caso de erro
 */
function runCommand(cmd) {
    try {
        return execSync(cmd, { encoding: 'utf-8' }).trim();
    } catch (err) {
        return null;
    }
}

console.log('🔍 [Auto-Healing] Verificando incidentes e status do GitHub Actions...\n');

// 1. Verificar issues abertas com a label ci-failure
const issuesRaw = runCommand('gh issue list --label ci-failure --json number,title,createdAt,url --limit 5');
let openIssues = [];
if (issuesRaw) {
    try {
        openIssues = JSON.parse(issuesRaw);
    } catch {
        openIssues = [];
    }
}

if (openIssues.length > 0) {
    console.log(`🚨 ${openIssues.length} Incidente(s) de CI em aberto encontrado(s):`);
    for (const issue of openIssues) {
        console.log(`   - #${issue.number}: ${issue.title}`);
        console.log(`     URL: ${issue.url}`);
    }
    console.log('');
} else {
    console.log('✅ Nenhuma Issue de falha de CI pendente.');
}

// 2. Verificar últimas runs com falha
const runsRaw = runCommand('gh run list --status failure --limit 3 --json databaseId,headBranch,conclusion,createdAt,url');
let failedRuns = [];
if (runsRaw) {
    try {
        failedRuns = JSON.parse(runsRaw);
    } catch {
        failedRuns = [];
    }
}

if (failedRuns.length > 0) {
    const latestFail = failedRuns[0];
    console.log(`\n📋 Última execução com falha no GitHub:`);
    console.log(`   - Run ID: ${latestFail.databaseId}`);
    console.log(`   - Branch: ${latestFail.headBranch}`);
    console.log(`   - Data:   ${latestFail.createdAt}`);
    console.log(`   - URL:    ${latestFail.url}`);

    console.log('\n📥 Extraindo log da falha (gh run view --log-failed):');
    const logs = runCommand(`gh run view ${latestFail.databaseId} --log-failed`);
    if (logs) {
        const lines = logs.split('\n');
        const preview = lines.slice(-25).join('\n');
        console.log('\n--- ÚLTIMAS LINHAS DO ERRO ---');
        console.log(preview);
        console.log('-------------------------------\n');
    }
} else {
    console.log('✅ Nenhuma run com falha registrada recentemente no GitHub Actions.');
}
