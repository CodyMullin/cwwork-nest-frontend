<template>
  <div>
    <div>
      Hello World
    </div>
    <div>{{ materials }}</div>

    <form
      v-on:submit.prevent="
        createMaterial(
          name,
          description,
          salesCost,
          purchaseCost,
          installCost,
          category,
          measurement
        )
      "
    >
      <div>
        <label for="Name">Name</label>
        <input type="text" class="border-2" v-model="newMaterial.name" />
      </div>
      <div>
        <label for="Name">Description</label>
        <input type="text" class="border-2" v-model="newMaterial.description" />
      </div>
      <div>
        <label for="Name">Sales Cost</label>
        <input type="text" class="border-2" v-model="newMaterial.salesCost" />
      </div>
      <div>
        <label for="Name">Purchase Cost</label>
        <input
          type="text"
          class="border-2"
          v-model="newMaterial.purchaseCost"
        />
      </div>
      <div>
        <label for="Name">Install Cost</label>
        <input type="text" class="border-2" v-model="newMaterial.installCost" />
      </div>
      <div>
        <label for="Name">Category</label>
        <input type="text" class="border-2" v-model="newMaterial.category" />
      </div>
      <div>
        <label for="Name">Measurement</label>
        <input type="text" class="border-2" v-model="newMaterial.measurement" />
      </div>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      materials: [],
      newMaterial: {
        name: "",
        description: "",
        salesCost: "",
        purchaseCost: "",
        installCost: "",
        category: "",
        measurement: "",
      },
      accessToken: this.$store.state.accessToken,
    };
  },
  mounted() {
    axios
      .get("http://localhost:3000/materials", {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      })
      .then((response) => (this.materials = response.data));
  },
  methods: {
    async createMaterial(
      name,
      description,
      salesCost,
      purchaseCost,
      installCost,
      category,
      measurement
    ) {
      const response = await axios.post(
        "http://localhost:3000/materials",
        {
          name,
          description,
          salesCost,
          purchaseCost,
          installCost,
          category,
          measurement,
        },
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        }
      );
      console.log(response);
    },
  },
};
</script>
