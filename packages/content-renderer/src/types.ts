import React from "react";

export interface ContentRendererCommons {};

export type ContentRendererProps = Partial<ContentRendererCommons> & React.AllHTMLAttributes<HTMLDivElement>;