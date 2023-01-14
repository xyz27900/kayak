import MarkdownIt from 'markdown-it';
import container from 'markdown-it-container';
import Token from 'markdown-it/lib/token.js';

export const imagePlugin = (md: MarkdownIt): void => {
  md.renderer.rules.image = (tokens: Token[], idx: number): string => {
    const token = tokens[idx];
    const srcIndex = token.attrIndex('src');
    const src = token.attrs?.[srcIndex][1] ?? '';
    const altIndex = token.attrIndex('alt');
    const alt = token.attrs?.[altIndex][1] ?? '';
    return `<div style="border-radius: 8px; overflow: hidden;"><img src="${src}" alt="${alt}" /></div>`;
  };
};

export const imageGroupPlugin = (md: MarkdownIt): void => {
  md.use(container, 'image-group', {
    render: (tokens: Token[], idx: number) => {
      if (tokens[idx].nesting === 1) {
        for (let i = idx + 1; !(tokens[i].nesting === -1 && tokens[i].type === 'container_image-group_close'); i++) {
          if (tokens[i].type === 'paragraph_open') {
            tokens[i].type = 'html_block';
            tokens[i].content = '<div style="display: flex; gap: 1rem; margin: 16px 0;">';
          }

          if (tokens[i].type === 'paragraph_close') {
            tokens[i].type = 'html_block';
            tokens[i].content = '</div>';
          }
        }
      }

      return '';
    }
  });
};
