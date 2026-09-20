drop policy "Public profiles are viewable by everyone." on public.profiles;

create policy "Users can select own profile." on public.profiles
  for select using (auth.uid() = id);
