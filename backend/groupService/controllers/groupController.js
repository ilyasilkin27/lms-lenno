import supabase from "../db/supabase.js";

const createGroup = async (name, classes = null) => {
  const { data, error } = await supabase
    .from("groups")
    .insert([{ name, classes }])
    .select();

  if (error) throw new Error(error.message);
  return data[0];
};

const getAllGroups = async () => {
  const { data, error } = await supabase.from("groups").select("*");
  if (error) throw new Error(error.message);
  return data;
};

const getGroupById = async (id) => {
  const { data, error } = await supabase
    .from("groups")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);
  return data;
};

const updateGroup = async (id, name, classes) => {
  const { data, error } = await supabase
    .from("groups")
    .update({ name, classes })
    .eq("id", id)
    .select();

  if (error) throw new Error(error.message);
  return data[0];
};

const deleteGroup = async (id) => {
  const { error } = await supabase.from("groups").delete().eq("id", id);

  if (error) throw new Error(error.message);
};

export default {
  createGroup,
  getAllGroups,
  getGroupById,
  updateGroup,
  deleteGroup,
};
