# Taste (Continuously Learned by [CommandCode][cmd])

[cmd]: https://commandcode.ai/

# Communication
- Use text diagrams to explain architecture and how things work. Confidence: 0.80
- Explain concepts before or alongside implementation, especially for unfamiliar patterns. Confidence: 0.55

# CLI Design
- Use pnpm or npx for running CLI tools, not bash scripts. Confidence: 0.80
- README examples should use npx or pnpm commands, not bash. Confidence: 0.80
- Keep CLI subcommand structure minimal; don't add redundant subcommands when the CLI's purpose is already specific. Confidence: 0.65

# Project Structure
- Keep examples flat in a single examples/ directory, not nested in subdirectories. Confidence: 0.80
- Use an assets/ subdirectory for data files, but example scripts stay flat. Confidence: 0.70
- Include text diagrams of output directly in README alongside runnable examples. Confidence: 0.80

# Git
- Write commit messages with detailed, specific technical descriptions. Confidence: 0.70
