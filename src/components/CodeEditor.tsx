import { useMemo } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { EditorView, keymap } from '@codemirror/view'
import { HighlightStyle, StreamLanguage, syntaxHighlighting, indentUnit } from '@codemirror/language'
import { python } from '@codemirror/lang-python'
import { sql, SQLite } from '@codemirror/lang-sql'
import { r } from '@codemirror/legacy-modes/mode/r'
import { tags as t } from '@lezer/highlight'
import type { Lang } from '../data/types'

// Editor chrome uses the arcade palette (void background, lime caret and keywords).
const chrome = EditorView.theme({
  '&': { height: '100%', fontSize: '13.5px', backgroundColor: 'var(--gm-void)', color: 'var(--gm-ink)' },
  '.cm-scroller': { fontFamily: 'var(--font-mono)', lineHeight: '1.65' },
  '.cm-content': { padding: '12px 0', caretColor: 'var(--gm-lime)' },
  '.cm-gutters': { backgroundColor: 'var(--gm-void)', color: 'var(--gm-ink-dim)', border: 'none', paddingLeft: '6px' },
  '.cm-activeLine': { backgroundColor: 'color-mix(in srgb, var(--gm-deep) 45%, transparent)' },
  '.cm-activeLineGutter': { backgroundColor: 'transparent', color: 'var(--gm-ink-soft)' },
  '&.cm-focused': { outline: 'none' },
  '&.cm-focused .cm-cursor': { borderLeftColor: 'var(--gm-lime)', borderLeftWidth: '2px' },
  '.cm-selectionBackground, &.cm-focused .cm-selectionBackground, ::selection': { backgroundColor: 'color-mix(in lab, var(--gm-grape) 55%, transparent) !important' },
  '.cm-matchingBracket': { backgroundColor: 'var(--gm-deep)', outline: '1px solid var(--gm-line)' },
  '.cm-tooltip': { backgroundColor: 'var(--gm-night)', border: '1px solid var(--gm-line)', borderRadius: '8px' },
  '.cm-tooltip-autocomplete > ul > li[aria-selected]': { backgroundColor: 'var(--gm-deep)', color: 'var(--gm-ink)' },
})

const highlight = HighlightStyle.define([
  { tag: [t.keyword, t.controlKeyword, t.operatorKeyword, t.definitionKeyword, t.moduleKeyword], color: 'var(--gm-lime)' },
  { tag: [t.string, t.special(t.string)], color: 'var(--gm-cyan)' },
  { tag: [t.number, t.bool, t.null, t.atom], color: 'var(--gm-gold)' },
  { tag: [t.comment, t.lineComment, t.blockComment], color: 'var(--gm-ink-dim)', fontStyle: 'italic' },
  { tag: [t.function(t.variableName), t.function(t.propertyName)], color: 'var(--gm-ink)' , fontWeight: '500' },
  { tag: [t.definition(t.variableName), t.definition(t.function(t.variableName))], color: 'var(--gm-ink)', fontWeight: '600' },
  { tag: [t.typeName, t.className], color: 'var(--gm-coral)' },
  { tag: [t.operator, t.punctuation, t.bracket], color: 'var(--gm-ink-soft)' },
  { tag: t.variableName, color: 'var(--gm-ink)' },
])

const languageFor = (lang: Lang) =>
  lang === 'python' ? python() : lang === 'sql' ? sql({ dialect: SQLite, upperCaseKeywords: true }) : StreamLanguage.define(r)

export function CodeEditor({
  lang,
  value,
  onChange,
  onRun,
  onSubmit,
  label,
}: {
  lang: Lang
  value: string
  onChange: (v: string) => void
  onRun?: () => void
  onSubmit?: () => void
  label: string
}) {
  const extensions = useMemo(
    () => [
      languageFor(lang),
      chrome,
      syntaxHighlighting(highlight),
      indentUnit.of(lang === 'python' ? '    ' : '  '),
      EditorView.contentAttributes.of({ 'aria-label': label }),
      keymap.of([
        { key: 'Mod-Enter', preventDefault: true, run: () => (onRun?.(), true) },
        { key: 'Mod-Shift-Enter', preventDefault: true, run: () => (onSubmit?.(), true) },
      ]),
    ],
    [lang, label, onRun, onSubmit],
  )
  return (
    <CodeMirror
      value={value}
      onChange={onChange}
      extensions={extensions}
      theme="none"
      height="100%"
      className="h-full"
      basicSetup={{ foldGutter: false, highlightActiveLineGutter: true, autocompletion: true, tabSize: lang === 'python' ? 4 : 2 }}
    />
  )
}
