const { Octokit } = require("@octokit/rest");
const fs = require("fs");

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

const owner = "dev-pods";
const repo = "dora-metrics";

async function main() {
  const deployments = await octokit.rest.actions.listWorkflowRunsForRepo({
    owner,
    repo,
    workflow_id: "deploy.yml",
    status: "completed",
  });

  const runs = deployments.data.workflow_runs;
  const deploymentCount = runs.length;

  const prs = await octokit.rest.pulls.list({
    owner,
    repo,
    state: "closed",
  });

  const leadTimes = prs.data
    .filter(pr => pr.merged_at)
    .map(pr => {
      const created = new Date(pr.created_at);
      const merged = new Date(pr.merged_at);
      return (merged - created) / (1000 * 60 * 60); // horas
    });

  const avgLeadTime = leadTimes.length
    ? (leadTimes.reduce((a, b) => a + b, 0) / leadTimes.length).toFixed(2)
    : 0;

  const metrics = {
    deployment_frequency: deploymentCount,
    average_lead_time_hours: avgLeadTime,
    generated_at: new Date().toISOString(),
  };

  fs.writeFileSync("metrics.json", JSON.stringify(metrics, null, 2));
  console.log("Metrics collected:", metrics);
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
