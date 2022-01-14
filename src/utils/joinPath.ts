import { Auto, Branded, IsNever, IsUnknown, PathString } from '../types';
import { FieldPathSetValue, FieldPathValue } from '../types/path/value';

/**
 * Function for joining two paths / path strings to a {@link TypedFieldPath}.
 * @param path      - base path
 * @param childPath - the path which should be appended to the base path
 * @example
 * ```
 * type Baz = { baz: string }
 * type FooBarBaz = { foo: { bar: Baz }}
 *
 * const path: TypedFieldPath<FooBarBaz, Baz> = createPath('foo.bar')
 * const joinedPath: TypedFieldPath<FooBar, string> = joinPath(path, 'baz')
 * ```
 */
export default function joinPath<
  TFieldValues,
  TPathString extends PathString,
  TChildFieldValues,
  TChildPathString extends PathString,
  TValue = unknown,
  TValueSet = never,
>(
  path: Auto.TypedFieldPath<
    TFieldValues,
    TPathString,
    TChildFieldValues,
    NonNullable<TChildFieldValues>
  >,
  childPath: Auto.TypedFieldPath<
    TChildFieldValues,
    TChildPathString,
    TValue,
    TValueSet
  >,
): Branded.TypedFieldPath<
  TFieldValues,
  IsUnknown<TValue> extends true
    ? FieldPathValue<TChildFieldValues, TChildPathString>
    : TValue,
  IsNever<TValueSet> extends true
    ? FieldPathSetValue<TChildFieldValues, TChildPathString>
    : TValueSet
> {
  return `${path}.${childPath}` as never;
}