/**
 * TheoryContent Component
 * 
 * Renders theory content with rich formatting support including:
 * - Headings (**, ----)
 * - Bold text (**text**)
 * - Code blocks (``` or indented)
 * - Bullet lists (• or -)
 * - Numbered lists (1. 2. 3.)
 * - Horizontal rules (---)
 */

import { useMemo } from 'react';
import styles from './TheoryContent.module.css';

export default function TheoryContent({ content, className = '' }) {
    const parsedContent = useMemo(() => {
        if (!content) return [];

        const lines = content.split('\n');
        const blocks = [];
        let i = 0;
        let inCodeBlock = false;
        let codeLines = [];

        while (i < lines.length) {
            const line = lines[i];
            const trimmedLine = line.trim();

            // Handle code block start/end
            if (trimmedLine.startsWith('```') || trimmedLine.startsWith('<!DOCTYPE') || trimmedLine.startsWith('<html')) {
                if (inCodeBlock) {
                    // End code block
                    blocks.push({ type: 'code', content: codeLines.join('\n') });
                    codeLines = [];
                    inCodeBlock = false;
                    i++;
                    continue;
                } else if (trimmedLine.startsWith('```')) {
                    // Start code block
                    inCodeBlock = true;
                    i++;
                    continue;
                }
            }

            // End code block detection for HTML examples
            if (trimmedLine === '</html>' || (inCodeBlock && lines[i + 1]?.trim() === '' && lines[i + 2]?.trim().startsWith('Let'))) {
                if (inCodeBlock) {
                    codeLines.push(line);
                    blocks.push({ type: 'code', content: codeLines.join('\n') });
                    codeLines = [];
                    inCodeBlock = false;
                    i++;
                    continue;
                }
            }

            // Collect code block content
            if (inCodeBlock) {
                codeLines.push(line);
                i++;
                continue;
            }

            // Skip empty lines 
            if (trimmedLine === '') {
                i++;
                continue;
            }

            // Horizontal rule
            if (trimmedLine === '---' || trimmedLine === '---\r') {
                blocks.push({ type: 'hr' });
                i++;
                continue;
            }

            // HTML code example detection (starts with < and looks like HTML)
            if (trimmedLine.startsWith('<') && (
                trimmedLine.includes('DOCTYPE') ||
                trimmedLine.startsWith('<html') ||
                trimmedLine.startsWith('<h1>') ||
                trimmedLine.startsWith('<p>') ||
                trimmedLine.startsWith('<a ') ||
                trimmedLine.startsWith('<img ') ||
                trimmedLine.startsWith('<tagname')
            )) {
                // Collect HTML code block
                const htmlLines = [line];
                i++;
                while (i < lines.length) {
                    const nextLine = lines[i];
                    const nextTrimmed = nextLine.trim();
                    // Continue collecting if indented or HTML-like
                    if (nextTrimmed.startsWith('<') || nextTrimmed.startsWith('</') ||
                        nextLine.startsWith('  ') || nextLine.startsWith('\t') ||
                        nextTrimmed === '') {
                        if (nextTrimmed === '' && !lines[i + 1]?.trim().startsWith('<')) {
                            break;
                        }
                        htmlLines.push(nextLine);
                        i++;
                        if (nextTrimmed.endsWith('</html>') || nextTrimmed.endsWith('</tagname>')) {
                            break;
                        }
                    } else {
                        break;
                    }
                }
                blocks.push({ type: 'code', content: htmlLines.join('\n') });
                continue;
            }

            // Main heading (bold text on its own line at start)
            if (trimmedLine.startsWith('**') && trimmedLine.endsWith('**') && !trimmedLine.includes('**', 2)) {
                blocks.push({ type: 'h2', content: trimmedLine.slice(2, -2) });
                i++;
                continue;
            }

            // Numbered list items
            if (/^\d+\.\s/.test(trimmedLine)) {
                const listItems = [];
                while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
                    listItems.push(lines[i].trim().replace(/^\d+\.\s/, ''));
                    i++;
                }
                blocks.push({ type: 'ol', items: listItems });
                continue;
            }

            // Bullet list items (• or -)
            if (trimmedLine.startsWith('•') || (trimmedLine.startsWith('- ') && !trimmedLine.startsWith('---'))) {
                const listItems = [];
                while (i < lines.length) {
                    const item = lines[i].trim();
                    if (item.startsWith('•') || item.startsWith('- ')) {
                        listItems.push(item.replace(/^[•-]\s*/, ''));
                        i++;
                    } else {
                        break;
                    }
                }
                blocks.push({ type: 'ul', items: listItems });
                continue;
            }

            // Regular paragraph - collect until empty line or special marker
            const paragraphLines = [line];
            i++;
            while (i < lines.length) {
                const nextLine = lines[i];
                const nextTrimmed = nextLine.trim();

                // Stop at empty lines, headings, lists, code, or horizontal rules
                if (nextTrimmed === '' ||
                    nextTrimmed === '---' ||
                    nextTrimmed.startsWith('**') && nextTrimmed.endsWith('**') ||
                    /^\d+\.\s/.test(nextTrimmed) ||
                    nextTrimmed.startsWith('•') ||
                    nextTrimmed.startsWith('- ') ||
                    nextTrimmed.startsWith('<') ||
                    nextTrimmed.startsWith('```')) {
                    break;
                }
                paragraphLines.push(nextLine);
                i++;
            }

            blocks.push({ type: 'p', content: paragraphLines.join(' ') });
        }

        return blocks;
    }, [content]);

    // Render inline formatting (bold)
    const renderInline = (text) => {
        if (!text) return null;

        const parts = [];
        let remaining = text;
        let key = 0;

        while (remaining.length > 0) {
            const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
            const codeMatch = remaining.match(/`([^`]+)`/);

            // Find earliest match
            let earliestMatch = null;
            let matchType = null;

            if (boldMatch && (!earliestMatch || boldMatch.index < earliestMatch.index)) {
                earliestMatch = boldMatch;
                matchType = 'bold';
            }
            if (codeMatch && (!earliestMatch || codeMatch.index < earliestMatch.index)) {
                earliestMatch = codeMatch;
                matchType = 'code';
            }

            if (earliestMatch) {
                // Add text before match
                if (earliestMatch.index > 0) {
                    parts.push(<span key={key++}>{remaining.slice(0, earliestMatch.index)}</span>);
                }

                // Add formatted text
                if (matchType === 'bold') {
                    parts.push(<strong key={key++} className={styles.bold}>{earliestMatch[1]}</strong>);
                } else if (matchType === 'code') {
                    parts.push(<code key={key++} className={styles.inlineCode}>{earliestMatch[1]}</code>);
                }

                remaining = remaining.slice(earliestMatch.index + earliestMatch[0].length);
            } else {
                parts.push(<span key={key++}>{remaining}</span>);
                break;
            }
        }

        return parts;
    };

    if (!content) {
        return (
            <div className={`${styles.placeholder} ${className}`}>
                <p>Theory content for this topic will be available soon.</p>
            </div>
        );
    }

    return (
        <div className={`${styles.theoryContent} ${className}`}>
            {parsedContent.map((block, idx) => {
                switch (block.type) {
                    case 'h2':
                        return <h3 key={idx} className={styles.heading}>{renderInline(block.content)}</h3>;
                    case 'h3':
                        return <h4 key={idx} className={styles.subheading}>{renderInline(block.content)}</h4>;
                    case 'p':
                        return <p key={idx} className={styles.paragraph}>{renderInline(block.content)}</p>;
                    case 'code':
                        return (
                            <pre key={idx} className={styles.codeBlock}>
                                <code>{block.content}</code>
                            </pre>
                        );
                    case 'ul':
                        return (
                            <ul key={idx} className={styles.bulletList}>
                                {block.items.map((item, i) => (
                                    <li key={i}>{renderInline(item)}</li>
                                ))}
                            </ul>
                        );
                    case 'ol':
                        return (
                            <ol key={idx} className={styles.numberedList}>
                                {block.items.map((item, i) => (
                                    <li key={i}>{renderInline(item)}</li>
                                ))}
                            </ol>
                        );
                    case 'hr':
                        return <div key={idx} className={styles.divider} />;
                    default:
                        return null;
                }
            })}
        </div>
    );
}
