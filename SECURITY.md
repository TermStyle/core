# Security Policy

## Supported Versions

We actively support the following versions of @termstyle/core with security updates:

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take the security of @termstyle/core seriously. If you discover a security vulnerability, please report it to us responsibly.

### How to Report

**Please do NOT report security vulnerabilities through public GitHub issues.**

Instead, please send an email to [security@termstyle.com](mailto:security@termstyle.com) with the following information:

- Type of issue (e.g., buffer overflow, injection, cross-site scripting, etc.)
- Full paths of source file(s) related to the manifestation of the issue
- The location of the affected source code (tag/branch/commit or direct URL)
- Any special configuration required to reproduce the issue
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the issue, including how an attacker might exploit the issue

### What to Expect

After you submit a report, we will:

1. **Acknowledge receipt** within 24 hours
2. **Investigate** the issue within 48 hours
3. **Provide an initial assessment** within 72 hours
4. **Keep you informed** of our progress throughout the investigation
5. **Credit you** in our security advisory (unless you prefer to remain anonymous)

### Response Timeline

- **Critical vulnerabilities**: Patched within 24-48 hours
- **High severity**: Patched within 1 week
- **Medium/Low severity**: Patched in the next scheduled release

## Security Considerations

### Input Validation

@termstyle/core processes user input for styling. While the library is designed to be safe, consider these guidelines:

```javascript
// ✅ Safe: Using predefined styles
termstyle.red('user input');

// ✅ Safe: Validating color inputs
function safeColor(color) {
  if (!/^#[0-9A-F]{6}$/i.test(color)) {
    throw new Error('Invalid color format');
  }
  return termstyle.hex(color);
}

// ⚠️ Caution: User-provided template strings
// Validate user input before using in templates
const userInput = sanitizeInput(untrustedInput);
termstyle`User said: ${termstyle.blue(userInput)}`;
```

### ANSI Injection

The library generates ANSI escape sequences. Be aware of potential ANSI injection attacks:

```javascript
// ✅ Safe: Library-generated ANSI codes
termstyle.red('safe text');

// ⚠️ Potential risk: Raw ANSI codes from user input
// Always sanitize user input that might contain ANSI codes
function sanitizeUserInput(input) {
  // Remove existing ANSI codes
  return termstyle.strip(input);
}
```

### Terminal Compatibility

Different terminals handle ANSI codes differently. The library includes safety measures:

- Automatic terminal capability detection
- Graceful degradation for unsupported features
- Option to disable color output

### Memory Safety

The library includes memory management features:

- Automatic cache cleanup
- Configurable memory limits
- Protection against memory leaks

```javascript
// Configure memory limits
termstyle.configure({
  performance: {
    cacheSize: 1000,  // Limit cache size
    enableCaching: true
  }
});
```

## Best Practices

### For Library Users

1. **Validate User Input**: Always validate and sanitize user-provided input before styling
2. **Limit Dynamic Styles**: Avoid creating unlimited dynamic styles from user input
3. **Use Safe Defaults**: Prefer predefined styles over dynamic color generation
4. **Monitor Memory**: Be aware of memory usage in high-frequency applications

### For Contributors

1. **Input Validation**: Validate all inputs in public APIs
2. **Escape Sequences**: Be careful when generating ANSI escape sequences
3. **Memory Management**: Ensure proper cleanup of resources
4. **Error Handling**: Provide safe fallbacks for error conditions
5. **Testing**: Include security-focused tests

## Known Security Considerations

### ANSI Escape Sequence Handling

The library generates ANSI escape sequences for terminal formatting. While these are generally safe, consider:

- Some terminals may interpret certain sequences differently
- Malformed sequences could cause display issues
- The library includes validation to prevent malformed sequences

### Memory Usage

Style caching can consume memory. The library includes:

- Configurable cache limits
- Automatic cleanup mechanisms
- Memory monitoring capabilities

### Terminal Environment

The library detects terminal capabilities but users should:

- Be aware of environment differences
- Test in target environments
- Consider graceful degradation

## Security Updates

Security updates will be:

- Released as patch versions (e.g., 1.0.1)
- Announced in release notes
- Documented in CHANGELOG.md
- Communicated via GitHub Security Advisories

### Staying Updated

To stay informed about security updates:

1. Watch this repository for releases
2. Subscribe to GitHub Security Advisories
3. Monitor our changelog
4. Follow [@termstyle](https://twitter.com/termstyle) for announcements

## Responsible Disclosure

We believe in responsible disclosure and will:

- Work with security researchers to understand and fix issues
- Provide credit to researchers who report issues responsibly
- Maintain confidentiality until fixes are available
- Coordinate disclosure timing with reporters

## Bug Bounty

Currently, we do not offer a formal bug bounty program. However, we deeply appreciate security researchers who help improve our security posture and will:

- Provide public recognition (if desired)
- Consider rewards for significant findings
- Prioritize fixes for reported vulnerabilities

## Contact

For security-related inquiries:

- **Email**: [security@termstyle.com](mailto:security@termstyle.com)
- **GPG Key**: Available on request
- **Response Time**: Within 24 hours

For general questions about this security policy:

- Open an issue on GitHub (for non-sensitive questions)
- Email [support@termstyle.com](mailto:support@termstyle.com)

## Additional Resources

- [OWASP Secure Coding Practices](https://owasp.org/www-project-secure-coding-practices-quick-reference-guide/)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)
- [npm Security Guidelines](https://docs.npmjs.com/packages-and-modules/securing-your-code)

---

This security policy is based on industry best practices and is subject to updates as our security posture evolves.