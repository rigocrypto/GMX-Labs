import "./RepoInspection.css";

const TRUST_POINTS = [
  "Static repo inspection before install",
  "Package script and dependency review",
  "Malware-pattern detection",
  "Clear risk report for recruiters",
  "Candidate safety-first process",
];

type RepoInspectionCTAProps = {
  onRequestInspection: () => void;
};

/**
 * Prominent "New Premium Service" call-to-action rendered at the very top of the
 * homepage, above the hero. Presentational only — the parent owns the modal
 * open/close state and passes `onRequestInspection`.
 */
export default function RepoInspectionCTA({ onRequestInspection }: RepoInspectionCTAProps) {
  return (
    <section className="repo-cta reveal" aria-labelledby="repo-cta-title">
      <div className="repo-cta-copy">
        <p className="repo-cta-badge">New Premium Service</p>

        <h2 id="repo-cta-title" className="repo-cta-headline">
          Before You Send a Coding Assessment Repo,{" "}
          <span className="accent-text">Make Sure It&rsquo;s Safe.</span>
        </h2>

        <p className="repo-cta-subhead">
          GMX-Labs helps recruiters and hiring teams inspect GitHub, GitLab, and
          Bitbucket assessment repos for malicious scripts, remote-code-execution
          payloads, exposed secrets, dependency risks, and fake-job malware
          patterns.
        </p>

        <p className="repo-cta-lead">
          Protect candidates before asking them to clone, install, or run private
          code &mdash; a static security review for recruiters, agencies, and
          hiring teams.
        </p>

        <ul className="repo-cta-points" aria-label="What the inspection covers">
          {TRUST_POINTS.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>

        <div className="repo-cta-actions">
          <button
            type="button"
            className="btn btn-primary repo-cta-primary"
            onClick={onRequestInspection}
          >
            Request Repo Inspection
          </button>
          <span className="repo-cta-secondary">
            For recruiters sending GitHub, GitLab, or Bitbucket assessment repos.
          </span>
        </div>
      </div>
    </section>
  );
}
