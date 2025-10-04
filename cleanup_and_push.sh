#cleanup_and_push.sh
#!/bin/bash
# ============================================
# cleanup_and_push.sh
# Cleans unneeded files and pushes a clean branch
# ============================================

set -e  # stop on first error

echo "🧹 Starting repo cleanup..."

# 1. Create or update .gitignore
cat > .gitignore << 'EOF'
# macOS
.DS_Store

# Node / React Native / Expo
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
expo-debug.log*
package-lock.json

# TypeScript
*.tsbuildinfo

# IDEs
.vscode/
.idea/

# Build / output
dist/
build/
EOF

echo "✅ .gitignore updated."

# 2. Remove already-tracked junk from git index
echo "🪓 Removing tracked junk files..."
git rm -r --cached --ignore-unmatch node_modules || true
git rm -r --cached --ignore-unmatch **/node_modules || true
git rm -r --cached --ignore-unmatch *.DS_Store || true
git rm -r --cached --ignore-unmatch **/*.DS_Store || true
git rm -r --cached --ignore-unmatch package-lock.json || true

# 3. Add and commit changes
echo "💾 Committing cleanup..."
git add .gitignore
git add .
git commit -m "Clean repo: remove node_modules, DS_Store, and build files" || echo "Nothing to commit."

# 4. Push to clean_push branch
echo "🌐 Pushing to branch: clean_push"
git push origin clean_push

echo "✅ Cleanup complete!"
echo ""
echo "👉 Review your branch on GitHub before replacing main."
echo "   When ready, run:"
echo "      git push origin clean_push:main --force"
echo ""
echo "🖖 All systems nominal, Captain."
