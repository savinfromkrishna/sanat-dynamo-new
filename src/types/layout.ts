
// src/types/layout.ts
import { ReactNode } from 'react';

export type LayoutProps<Path extends string> = {
  children: ReactNode;
  params: Promise<ParamsFromPath<Path>>;
};

/** Extract param names from a route string */
type ParamsFromPath<Path extends string> =
  Path extends `/${infer _}/[${infer P}]/${infer Rest}`
    ? { [K in P]: string } & ParamsFromPath<`/${Rest}`>
    : Path extends `/${infer _}/[${infer P}]`
      ? { [K in P]: string }
      : {};

export type LayoutConfig<Path extends string> = {
  default:
    | ((props: LayoutProps<Path>) => ReactNode | Promise<ReactNode>)
    | ((props: LayoutProps<Path>) => void);
};