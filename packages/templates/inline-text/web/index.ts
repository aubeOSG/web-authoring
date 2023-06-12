import { InlineTextSchema, InlineTextSchemaProps } from '../src';
import InlineText from './inline-text-lazy';

window.InlineText = InlineText;
//@ts-ignore
window.InlineTextSchema = InlineTextSchema as InlineTextSchemaProps;
