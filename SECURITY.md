# Security Policy

GMX-Labs takes security seriously. This policy explains which parts of the project are currently supported and how developers, users, and security researchers can responsibly report vulnerabilities.

## Supported Versions

GMX-Labs is currently in active development. Security updates are provided for the latest codebase available on the main production branch.

| Version / Branch                       | Supported      |
| -------------------------------------- | -------------- |
| `main` / production release            | ✅ Yes          |
| active staging or development branches | ✅ Best effort  |
| old, archived, or forked versions      | ❌ No           |

## Security Scope

Please report any vulnerability related to:

- Frontend application security
- Web3 wallet connection flows
- Authentication or authorization issues
- API key or environment variable exposure
- Supabase storage or database access issues
- Form submission or lead capture vulnerabilities
- File upload abuse, unsafe file handling, or storage misconfiguration
- Dependency vulnerabilities
- Cross-site scripting, injection, broken access control, or data leaks
- Smart contract or blockchain integration issues, if applicable in future GMX-Labs projects

## Reporting a Vulnerability

Please do **not** open a public GitHub issue for security vulnerabilities.

To report a vulnerability, contact:

**Email:** security@gmx-labs.com

> If the above address is not yet active, use the interim contact: [rigovivas71@gmail.com](mailto:rigovivas71@gmail.com)

Please include as much detail as possible:

- Description of the vulnerability
- Steps to reproduce
- Affected file, page, endpoint, or feature
- Potential impact
- Screenshots, logs, proof of concept, or test cases if available
- Suggested fix, if you have one

## Response Timeline

We aim to respond to valid security reports as follows:

- **Initial acknowledgment:** within 72 hours
- **Initial review:** within 7 business days
- **Fix timeline:** based on severity and impact
- **Public disclosure:** only after the issue has been reviewed and patched, when appropriate

## Responsible Disclosure

We ask security researchers and contributors to:

- Avoid accessing, modifying, or deleting user data
- Avoid service disruption, spam, or denial-of-service testing
- Avoid publicly disclosing the vulnerability before GMX-Labs has had time to investigate and fix it
- Provide a reasonable amount of time for remediation before disclosure

## Out of Scope

The following are generally out of scope unless they demonstrate real security impact:

- Automated scanner results without proof of exploitability
- Missing HTTP headers without a practical attack path
- Social engineering attacks
- Physical attacks
- Issues in third-party services outside GMX-Labs control
- Vulnerabilities caused by modified forks or outdated local copies

## Security Best Practices for Contributors

Developers contributing to GMX-Labs should follow these rules:

- Never commit `.env`, `.env.local`, private keys, seed phrases, API keys, or service-role keys
- Use only public-safe frontend environment variables with the `VITE_` prefix
- Keep Supabase service-role keys server-side only
- Validate all form inputs before submission
- Validate uploaded files by type, size, and count
- Keep dependencies updated
- Run security checks before merging
- Avoid logging sensitive user data
- Use least-privilege permissions for storage buckets, databases, and API integrations

## Web3-Specific Security Notes

For any GMX-Labs Web3 feature, contributors should take extra care with:

- Wallet connection permissions
- Transaction previews and user confirmations
- Smart contract addresses and chain IDs
- Token approvals
- Signature requests
- Phishing-resistant UI copy
- Contract verification before production use
- Testnet validation before mainnet deployment

GMX-Labs will never ask users for seed phrases, private keys, or wallet recovery phrases under any circumstance.
